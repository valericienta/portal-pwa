import { Component, OnInit, ViewChild } from '@angular/core';
import { LiquidacionesHistorialComponent } from './liquidaciones-historial/liquidaciones-historial.component';



@Component({
  selector: 'app-liquidaciones',
  templateUrl: './liquidaciones.page.html',
  styleUrls: ['./liquidaciones.page.scss'],
})
export class LiquidacionesPage implements OnInit {

  @ViewChild(LiquidacionesHistorialComponent) historial: LiquidacionesHistorialComponent;
  
  constructor( ) { }
  
  ngOnInit() {  }

  getHistorial(){
    this.historial.loadHistorial();
  }
}
