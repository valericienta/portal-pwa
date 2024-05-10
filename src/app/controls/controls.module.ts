import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { IonRangeCalendarModule } from '@googlproxer/ion-range-calendar';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonRangeCalendarModule
  ],
  exports: [
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ControlsModule { }