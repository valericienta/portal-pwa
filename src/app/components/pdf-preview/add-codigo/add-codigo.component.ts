import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-add-codigo',
  templateUrl: './add-codigo.component.html',
  styleUrls: ['./add-codigo.component.scss'],
})

export class AddCodigoComponent implements OnInit {
  @Output() hideAddCode = new EventEmitter<boolean>();

  codigo: string;
  @Input() via: string;
  @Input() id: string;

  constructor(
    public documentosService: DocumentosService,
    public toastService: ToastService,
    public router: Router,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  async firmar() {
    const coordinates = await Geolocation.getCurrentPosition();
    let location = `${coordinates.coords.latitude},${coordinates.coords.longitude}`;
    let code = ("000000" + this.codigo).slice(-6);
    if (!environment.gps) location = "-31.294444444444,-64.295277777778";
    this.documentosService.firmar('mobile', this.id, code, location)
      .then(() => {
        localStorage.setItem("2fa-via", this.via);
        localStorage.setItem("2fa-code", code);
        localStorage.setItem("2fa-date", new Date().getTime().toString());
        this.toastService.present("El documento ha sido firmado en forma exitosa", "success");
        this.modalCtrl.dismiss({},'firmado');
      })
  }

  dismiss() {
    this.hideAddCode.emit(true);
  }
}