import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonPopover } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  @ViewChild('popover') popover: any = {};
  isOpen = false;

  constructor(public authService: AuthenticationService, public router: Router, public global: GlobalService) {

  }

  ngOnInit() {
  }


  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  goMiCuenta() {
    this.popover.dismiss();
    this.router.navigate(['/mi-cuenta']);
  }

  SignOut() {
    this.global.user = new Usuario();
    this.global.tenants = [];
    this.global.tenant = '';
    this.popover.dismiss();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
