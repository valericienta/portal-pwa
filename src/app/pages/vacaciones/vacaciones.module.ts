import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacacionesPage } from './vacaciones.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonRangeCalendarModule } from '@googlproxer/ion-range-calendar';
import localeEsAr from '@angular/common/locales/es-AR';

import { VacacionesPageRoutingModule } from './vacaciones-routing.module';
import { VacacionesSolicitarComponent } from './vacaciones-solicitar/vacaciones-solicitar.component';
import { VacacionesHistorialComponent } from './vacaciones-historial/vacaciones-historial.component';
import { VacacionesSolicitudesComponent } from './vacaciones-solicitudes/vacaciones-solicitudes.component';


registerLocaleData(localeEsAr, 'es-Ar');
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    VacacionesPageRoutingModule,
    FontAwesomeModule,
    IonRangeCalendarModule
  ],
  declarations: [VacacionesPage,
    VacacionesSolicitarComponent,
    VacacionesSolicitudesComponent,
    VacacionesHistorialComponent
  ],
})
export class VacacionesPageModule { }
