import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GlobalService } from 'src/app/services/global.service';
import { Output, EventEmitter } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-select-tenant',
  templateUrl: './select-tenant.component.html',
  styleUrls: ['./select-tenant.component.scss'],
})
export class SelectTenantComponent implements OnInit {

  @Output() hideTenant = new EventEmitter<boolean>();

  constructor(public global: GlobalService,
    public authService: AuthenticationService,
    public router: Router,
    public loadingService: LoadingService,
    public menuController: MenuController) {

  }

  ngOnInit() { }


  selectTenant(item: any) {
    this.global.tenant = item.identifier;
    this.global.empresa = item.name.replace("Empresa", "");
    this.authService.setUser(this.global.tenant).then(() => {
      this.hideTenant.emit(true);
      this.loadingService.isLoading.next(false);
      if (localStorage.getItem("discardOnBoarding") == "true") this.router.navigate(['/home']);
      else this.router.navigate(['/onboarding']);
    })
  }

}
