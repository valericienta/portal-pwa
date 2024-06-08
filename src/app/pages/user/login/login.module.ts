import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SelectTenantComponent } from './select-tenant/select-tenant.component';
import { NotenantAlertComponent } from './notenant-alert/notenant-alert.component';

const components = [SelectTenantComponent, NotenantAlertComponent, LoginPage];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [...components],
  exports: [],
  providers: [],
})
export class LoginPageModule {}
