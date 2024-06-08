import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from '../../../services/toast.service';
import {
  AlertController,
  MenuController,
  ModalController,
} from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import {
  AuthenticationResult,
  EventMessage,
  EventType,
} from '@azure/msal-browser';
import { CustomNavigationClient } from 'src/app/services/ClientNavigation';
import { environment } from 'src/environments/environment';

import { Usuario } from 'src/app/models/usuario.model';
import { jwtDecode } from 'jwt-decode';
import { LoadingService } from '../../../services/loading.service';
import { UpdateStoresService } from 'src/app/services/update-stores.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  displayPassword = false;
  user = { email: '', password: '' };
  saludo = '';
  showTenants: boolean = false;
  showAlertNoTenant: boolean = false;
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public toastService: ToastService,
    public menuController: MenuController,
    public global: GlobalService,
    private iab: InAppBrowser,
    public modalController: ModalController,
    private msalService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    public authenticationService: AuthenticationService,
    public loadingService: LoadingService,
    public updates: UpdateStoresService,
    public alertController: AlertController
  ) {
    this.global.user = new Usuario();
    this.global.tenants = [];
    this.showTenants = false;
    this.msalService.handleRedirectObservable().subscribe();
    this.msalService.instance.setNavigationClient(
      new CustomNavigationClient(this.iab)
    );
  }

  ngOnInit() {
    if (environment.dev)
      this.user = { email: 'valericienta@gmail.com', password: 'Joluca05*' };
    this.menuController.enable(false);
    this.checkVersion();
    this.readEvent();
    this.CheckValidToken();
    if (localStorage.getItem('discardOnBoarding') === null) this.saludo = '';
    else this.saludo = ' otra vez';
  }

  redirectClave() {
    let entorno = '';
    if (environment.dev) entorno = '-test';
    let url = `https://app${entorno}.portaltrabajadores.cl/account/forgotpassword`;
    url = 'https://app.portaltrabajadores.cl/';
    let browser = this.iab.create(url);
    browser.show();
  }

  async checkVersion() {
    let updateNeeded = await this.updates.mustUpdate();
    if (updateNeeded) {
      this.alertaUpdate();
    }
  }

  async alertaUpdate() {
    const alert = await this.alertController.create({
      header: 'Nueva versión',
      message: 'Actualice la aplicación',
      buttons: [
        {
          text: 'Actualizar',
          handler: () => {},
        },
      ],
    });

    await alert.present();
  }

  CheckValidToken() {
    let storedToken = localStorage.getItem('token');
    storedToken = storedToken === null ? '' : storedToken;
    if (storedToken != '') {
      this.loadingService.isLoading.next(true);
      let tokenData: any = jwtDecode(storedToken);
      if (tokenData.exp * 1000 > new Date().getTime()) {
        this.SignIn({}, 'token');
      } else {
        this.loadingService.isLoading.next(false);
      }
    }
  }

  Login(type: string) {
    this.loadingService.isLoading.next(true);
    switch (type) {
      case 'portal':
        let data = { email: this.user.email, password: this.user.password };
        this.SignIn(data, 'user-portal');
        break;
      case 'google':
        this.GoogleSignIn();
        break;
      case 'microsoft':
        this.MicrosoftSignIn();
        break;
    }
  }

  SignIn(data: any, from: string) {
    this.authService
      .SignInPortal(data, from)
      .then((result) => {
        if (result == 'SUCCESS') {
          this.user.email = '';
          this.user.password = '';
          this.loadingService.isLoading.next(false);
          if (localStorage.getItem('discardOnBoarding') == 'true')
            this.router.navigate(['/home']);
          else this.router.navigate(['/onboarding']);
        } else {
          this.showTenants = true;
          this.loadingService.isLoading.next(false);
        }
      })
      .catch((error) => {
        this.loadingService.isLoading.next(false);
        if (error == 'WITHOUT TENANT') this.showAlertNoTenant = true;
        // else this.toastService.present(JSON.stringify(error), 'danger');
        else
          this.toastService.present(
            'Hubo un error iniciando sesión, intenta nuevamente.',
            'danger'
          );
      });
  }

  displayLogin() {
    this.showTenants = false;
    this.showAlertNoTenant = false;
  }

  GoogleSignIn() {
    this.authService
      .GoogleSignIn()
      .then((GoogleToken) => {
        this.SignIn({ idToken: GoogleToken }, 'google');
      })
      .catch((error: any) => {
        this.loadingService.isLoading.next(false);
        if (error.error != 'popup_closed_by_user')
          this.toastService.present(JSON.stringify(error), 'danger');
      });
  }

  MicrosoftSignIn() {
    const navigationClient = new CustomNavigationClient(this.iab);
    this.msalService.instance.setNavigationClient(navigationClient);
    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length > 0) {
      this.msalService.instance.setActiveAccount(accounts[0]);
      if (accounts[0].idToken != null) {
        let token = { idToken: accounts[0].idToken };
        this.SignIn(token, 'microsoft');
      }
    } else {
      this.msalService.instance
        .handleRedirectPromise()
        .then(() => {
          const account = this.msalService.instance.getActiveAccount();
          if (!account) this.msalService.instance.loginRedirect();
          else {
            let token = { idToken: accounts[0].idToken };
            this.SignIn(token, 'microsoft');
          }
        })
        .catch((err) => {
          alert(JSON.stringify(err));
        });
    }
  }

  readEvent() {
    this.msalBroadcastService.msalSubject$.subscribe((result: EventMessage) => {
      if (result.eventType === EventType.LOGIN_SUCCESS) {
        const payload = result.payload as AuthenticationResult;
        this.msalService.instance.setActiveAccount(payload.account);
        let token = { idToken: payload.idToken };
        this.SignIn(token, 'microsoft');
      }
    });
  }

  hideTenantDiv(value: boolean) {
    this.showTenants = !value;
  }
}
