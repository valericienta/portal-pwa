import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrototypesPageRoutingModule } from './prototypes-routing.module';

import { PrototypesPage } from './prototypes.page';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrototypesPageRoutingModule,
    NgxExtendedPdfViewerModule
  ],
  declarations: [PrototypesPage],

})
export class PrototypesPageModule { }
