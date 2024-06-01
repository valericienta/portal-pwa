import { AfterViewChecked, Component, OnInit, afterNextRender } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';


import { Documento } from 'src/app/interfaces/documento.interface';
import { DocumentosService } from 'src/app/services/documentos.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { LoadingService } from '../../services/loading.service';
import { Geolocation } from '@capacitor/geolocation';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

import { NativeBiometric, BiometryType } from "capacitor-native-biometric";
import { PDFDocumentProxy } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss'],
})


export class PdfPreviewComponent implements OnInit {

  id: string;
  documento: Documento;
  habilitadoFirma: boolean = false;
  zoom = 1.0;
  pageHeight: number = 0;
  pdfSrc: any;
  base64: any;
  loaddoc: boolean = false;
  loadpage: boolean = false;
  blobFile: any;
  dataFileFromAPI: any;
  showModalFirma: boolean = false;
  public spreadMode: 'off' | 'even' | 'odd' = 'off';
  public BiometricAvailable: boolean = false;

  pagecount: number = 1;
  pagesloaded: any;
  constructor(public documentosService: DocumentosService,
    public global: GlobalService,
    public modalCtrl: ModalController,
    public loadingService: LoadingService,
    public toastService: ToastService,
    public router: Router,
    public platform: Platform) {

    this.loadingService.isLoading.next(true);
    // this.platform.pause.subscribe(() => { this.modalCtrl.dismiss() });
    // this.platform.resume.subscribe(() => { this.router.navigate(['/home']) });
    this.checkFingerPrint();

  }

  getFile() {
    this.documentosService.getFile(this.id).then((data: any) => {
      this.dataFileFromAPI = data;
      this.setPDFData();
    })
    this.habilitadoFirma = this.global.user.MFAByApp == "False" && this.global.user.MFAByPhone == "False" ? false : true;
  }

  pdfLoaded(e: any) {
    this.pagecount = e.pagesCount;
    console.log('pdfLoaded: ' + this.pagecount)

    //   debugger;
    //   let pagesCount= pdfDocument.pagesCount;
    //   this.pageHeight = (pdf[0].clientHeight * pagesCount)+ 50; 
    //   this.loadpage = true;

  }

  getPageSize(e: any) {
    if (e.pageNumber == this.pagecount) {
      let pdfCanva = document.getElementsByClassName("canvasWrapper")[0];
      let pdfLoading = document.getElementsByClassName("page loadingIcon")[0];
      let pdfPage = document.getElementsByClassName("page")[0];
      let pdf: any;
      if (pdfPage) pdf = pdfPage;
      if (pdfCanva) pdf = pdfCanva;
      if (pdfLoading) pdf = pdfLoading;
      console.log(pdf);
      this.pageHeight = (pdf.clientHeight * this.pagecount) + 50;
      console.log('llego al final');
      this.loadpage = true;
    }

  }

  checkFingerPrint() {
    NativeBiometric.isAvailable()
      .then(result => {
        if (!result.isAvailable) return;
        else this.BiometricAvailable = true;

      })
      .catch(error => { this.BiometricAvailable = false; })
  }


  firmarBiometric() {
    NativeBiometric.verifyIdentity({
      title: "Firma de documentos",
      subtitle: "Utilice sus datos biometricos",
      description: " para firmar el documento",
    })
      .then(() => {
        this.signDocumento();
      })
      .catch(() => this.toastService.present("Autenticación inválida", "danger"));
  }


  setPDFData() {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.blobFile = this.dataFileFromAPI;
      this.pdfSrc = new Uint8Array(fileReader.result as ArrayBuffer);
      this.loaddoc = true;
      this.loadingService.isLoading.next(false);
    };
    fileReader.readAsArrayBuffer(this.dataFileFromAPI);

  }

  ngOnInit() {
    this.getFile();
  }

  hideSelectComponent(e: any) {
    this.setPDFData();
    this.showModalFirma = false;
  }

  firmar2FA() {
    let signdate = localStorage.getItem("2fa-date");
    if (signdate) {
      var duration = moment.duration(moment().diff(moment(signdate)));
      var minutes = duration.asMinutes();
      if (minutes > 60) this.showModalFirma = true;
      else this.signDocumento();
    }
    else this.showModalFirma = true;

  }

  async signDocumento() {
    const coordinates = await Geolocation.getCurrentPosition();
    let location = `${coordinates.coords.latitude},${coordinates.coords.longitude}`;
    if (!environment.gps) location = "-31.294444444444,-64.295277777778";
    this.documentosService.firmar('mobile', this.id, moment().format("YYYYMMDD"), location)
      .then((data) => {
        this.toastService.present("El documento ha sido firmado en forma exitosa", "success");
        this.router.navigate(['documentos/P'])
        this.modalCtrl.dismiss();
      })
  }

  firmarDocumento() {
    if (this.BiometricAvailable) this.firmarBiometric();
    else this.firmar2FA();
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  share() {
    let b64: any;
    let filename = `${this.documento.referencia}.pdf`;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      b64 = fileReader.result as string;
      console.log('b64 generated')
      return Filesystem.writeFile({
        path: filename,
        data: b64,
        directory: Directory.Cache
      })
        .then(() => {
          return Filesystem.getUri({
            directory: Directory.Cache,
            path: filename
          });
        })
        .then((uriResult) => {

          return Share.share({
            title: filename,
            text: filename,
            url: uriResult.uri,
          }).catch((error) => {
            if (error.message != 'Share canceled')
              this.toastService.present(error.message, "danger")
          })
        })
        .catch(error => {
          if (error) this.toastService.present(JSON.stringify(error), "danger")
        })
        .finally(() => { })
    };

    fileReader.readAsDataURL(this.blobFile);
  }
}
