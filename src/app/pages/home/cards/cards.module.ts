import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary, } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';

import { ComponentsModule } from 'src/app/components/components.module';
import { CardEventosComponent } from './card-eventos/card-eventos.component';
import { CardDocumentosComponent } from './card-documentos/card-documentos.component';
import { CardAccesosComponent } from './card-accesos/card-accesos.component';
import { CardVacacionesComponent } from './card-vacaciones/card-vacaciones.component';


const cards = [CardDocumentosComponent, CardEventosComponent, CardAccesosComponent, CardVacacionesComponent]
@NgModule({
  declarations: [
    ...cards
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FontAwesomeModule,
    ComponentsModule,
  ],
  exports: [
    ...cards
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardsModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fad, fal);
  }
}
