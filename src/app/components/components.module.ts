import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component';
import { AddCodigoComponent } from './pdf-preview/add-codigo/add-codigo.component';
import { FormsModule } from '@angular/forms';
import { SelectMetodoComponent } from './pdf-preview/select-metodo/select-metodo.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FiltrarComponent } from './filtrar/filtrar.component';
import { IonRangeCalendarModule } from '@googlproxer/ion-range-calendar';
import { TwoFAComponent } from './twofa/twofa.component';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { SectionTitleComponent } from './section-title/section-title.component';

const components = [
  PdfPreviewComponent,
  AddCodigoComponent,
  SelectMetodoComponent,
  FiltrarComponent,
  TwoFAComponent,
  SectionTitleComponent,
  HeaderComponent,
];

@NgModule({
  declarations: [HeaderComponent, ...components],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    IonRangeCalendarModule,
    IonicModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
  ],
  exports: [FontAwesomeModule, IonicModule, PdfPreviewComponent, ...components],
  providers: [FingerprintAIO],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fad, fal, fab);
  }
}
