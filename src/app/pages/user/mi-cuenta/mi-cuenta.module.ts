import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiCuentaPageRoutingModule } from './mi-cuenta-routing.module';

import { MiCuentaPage } from './mi-cuenta.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MiCuentaPageRoutingModule,   
  ],
  declarations: [MiCuentaPage],
  providers: [  InAppBrowser ]
})
export class MiCuentaPageModule {}
