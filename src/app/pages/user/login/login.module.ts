import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { SelectTenantComponent } from './select-tenant/select-tenant.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ComponentsModule,
    
  ],
  declarations: [LoginPage, SelectTenantComponent],
  exports: [SelectTenantComponent],
  providers: [
     
  ]
})
export class LoginPageModule {

}
