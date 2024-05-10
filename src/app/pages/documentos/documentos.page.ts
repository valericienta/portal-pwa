import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})
export class DocumentosPage implements OnInit {

  pendientes: boolean = true;
  constructor(private route: ActivatedRoute, public global: GlobalService) { }

  ngOnInit() {
    let tipo = this.route.snapshot.paramMap.get('tipo');
    if (tipo == 'P') this.pendientes = true; else this.pendientes = false;
  }

}
