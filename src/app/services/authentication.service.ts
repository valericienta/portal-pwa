import { Injectable } from '@angular/core';

import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { isPlatform } from '@ionic/angular';
import { GlobalService } from './global.service';
import { ToastService } from './toast.service';
import { UsuarioService } from './usuario.service';
import { Trabajador } from '../models/trabajador.model';
import { Tenants } from '../interfaces/tenants.interface';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  userData: any;
  refreshToken: string;


  constructor(
    public http: HttpClient,
    public router: Router,
    public global: GlobalService,
    public toastService: ToastService,
    public usuarioService: UsuarioService
  ) {
    if (!isPlatform('capacitor')) {
      GoogleAuth.initialize({
        clientId: environment.google.clientId,
        scopes: environment.google.scopes,
        grantOfflineAccess: true,
      });
    }
  }

  GoogleSignIn() {
    return new Promise((resolve, reject) => {
      GoogleAuth.signIn()
        .then((user: any) => { resolve(user.authentication.idToken) })
        .catch((error) => { reject(error) })
    });
  }

  GoogleSignOut() {
    return GoogleAuth.signOut();
  }

  SignInPortal(data: any, connection: string) { 
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let url = 'auth/token';
      switch (connection) {
        case 'google':
        case 'microsoft':
          url = 'auth/token/social';
          break;
      }

      if (connection == "token") {
        return new Promise((resolve, reject) => {
          let storedToken = localStorage.getItem("token");
          storedToken = storedToken === null ? '' : storedToken;
          Object.assign(this.global.user, jwtDecode(storedToken));
          this.global.setHabilitadoValue();
          this.getTenants()
            .then(data => resolve(data))
            .catch(error => reject(error))
        })

      }
      else {
        return new Promise((resolve, reject) => {
          this.http
            .post(url, data, { headers: headers })
            .subscribe({
              next: (token: any) => {
                this.global.user = new Usuario();
                Object.assign(this.global.user, jwtDecode(token.accessToken));
                this.global.setHabilitadoValue();
                localStorage.setItem('token', token.accessToken);
                localStorage.setItem('auth', connection);
                this.getTenants()
                  .then(data => resolve(data))
                  .catch(error => reject(error))

              },
              error: (error) => {
                reject(error);
              }
            });
        });
      }
    
  }

  SignOut() {
    this.router.navigate(['/login']);
  }

  setUser(identifier: string) {
    return new Promise((resolve, reject) => {
      this.global.tenant = identifier;
      this.usuarioService.getusuario()
        .then((data: Trabajador) => {
          this.global.trabajador = data;
          this.global.trabajador.defineAvatar();
          resolve("SUCCESS")
        })
        .catch((error) => reject(error))
    })
  }

  getTenants() {
    return new Promise((resolve, reject) => {
        this.usuarioService.getTenants().then((tenants: Tenants[]) => {
          if (tenants.length == 1) {
            this.global.empresa= tenants[0].name.replace("Empresa","");
            this.setUser(tenants[0].identifier)
              .then(data => resolve(data))
              .catch(error => reject(error))
          }
          else {
            this.global.tenants = tenants;
            resolve("SELECT-TENANT");
          }
        })
    })
  }
}
