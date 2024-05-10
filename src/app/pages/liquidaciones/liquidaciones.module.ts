import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiquidacionesPageRoutingModule } from './liquidaciones-routing.module';
import { LiquidacionesPage } from './liquidaciones.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LiquidacionesListaComponent } from './liquidaciones-lista/liquidaciones-lista.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    LiquidacionesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [LiquidacionesPage,
    LiquidacionesListaComponent]
})
export class LiquidacionesPageModule { }
