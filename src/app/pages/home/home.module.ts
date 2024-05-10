import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ControlsModule } from 'src/app/controls/controls.module';
import { HomeCardsModule } from './cards/cards.module';

@NgModule({
  imports: [CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HomeCardsModule,
    ControlsModule,
    ComponentsModule],
  declarations: [
    HomePage
  ],
})
export class HomePageModule { }
