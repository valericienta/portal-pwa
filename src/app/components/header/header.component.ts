import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonPopover, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('popover') popover: IonPopover;
  @Input() title: boolean;
  isOpen = false;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public global: GlobalService,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  goMiCuenta() {
    this.router.navigate(['/mi-cuenta']);
    this.popover.dismiss();
  }

  SignOut() {
    this.global.user = new Usuario();
    this.global.tenants = [];
    this.global.tenant = '';
    this.popover.dismiss();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  selectTenant(item: any) {
    this.global.tenant = item.identifier;
    this.global.empresa = item.name.replace('Empresa', '');
    this.authService.setUser(this.global.tenant).then(() => {
      this.router.navigate(['/home']);
      this.popover.dismiss();
      this.tenantSelected();
    });
  }

  async tenantSelected() {
    const toast = await this.toastController.create({
      message: 'Cambiaste a' + this.global.empresa,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
}
