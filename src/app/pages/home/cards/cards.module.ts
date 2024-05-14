import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { CardDatosPersonalesComponent } from './card-datos-personales/card-datos-personales.component';
import { CardEmergenciasComponent } from './card-emergencias/card-emergencias.component';
import { CardProfileComponent } from './card-profile/card-profile.component';
import { CardVacacionesComponent } from './card-vacaciones/card-vacaciones.component';
import { CardEventosComponent } from './card-eventos/card-eventos.component';
import { CardLiquidacionesComponent } from './card-liquidaciones/card-liquidaciones.component';
import { CardPorfirmarComponent } from './card-porfirmar/card-porfirmar.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [
    CardDatosPersonalesComponent,
    CardEmergenciasComponent,
    CardProfileComponent,
    CardVacacionesComponent,
    CardEventosComponent,
    CardLiquidacionesComponent,
    CardPorfirmarComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FontAwesomeModule,
    ComponentsModule,
  ],
  exports: [
    CardDatosPersonalesComponent,
    CardEmergenciasComponent,
    CardProfileComponent,
    CardVacacionesComponent,
    CardEventosComponent,
    CardLiquidacionesComponent,
    CardPorfirmarComponent,
  ],
})
export class HomeCardsModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fad, fal);
  }
}
