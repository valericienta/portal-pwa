import { Component, OnInit } from '@angular/core';
import { PagesLoadedEvent, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { AuthenticationService } from '../../services/authentication.service';
import { GlobalService } from 'src/app/services/global.service';
import { ChangeDetectorRef } from "@angular/core";
import { DocumentosService } from 'src/app/services/documentos.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-prototypes',
  templateUrl: './prototypes.page.html',
  styleUrls: ['./prototypes.page.scss'],
})
export class PrototypesPage implements OnInit {
  public spreadMode: 'off' | 'even' | 'odd' = 'off';

  userLogged: boolean = false;
  user: any;
  pdfSrc: any;
  base64: any;
  loaddoc: boolean = false;
  blobFile: any;
  page: any;

  file: any;
  constructor(public authService: AuthenticationService,
    public global: GlobalService,
    public documentosService: DocumentosService,
    public loadingService: LoadingService,
    private changeDetectorRef: ChangeDetectorRef,
    public platform: Platform,
  ) {
    this.platform.pause.subscribe(async () => {
      alert('Pause event detected');
    });
    this.platform.resume.subscribe(async () => {
      if (this.loaddoc && this.userLogged) {
        alert('Vemos de hacer el load de nuevo');
        
      }
    })

  }
  onEvent(type: string, event: any) {
    console.log(type, event)
  }

  public messages: Array<string> = [];

  public onPagesLoaded(pagecount: PagesLoadedEvent): void {
    const now = new Date().toLocaleTimeString();
    this.messages.push(`${now} Loaded a document with ${pagecount.pagesCount} pages`);
  }
  fastLogin() {
    this.loadingService.isLoading.next(true);
    let data = { email: 'valericienta@gmail.com', password: 'Joluca05*' };
    this.SignIn(data, 'user-portal');
  }

  ngOnInit() {

  }
  ionViewWillEnter() {
    alert('enter')
  }

  ionViewDidEnter() {
    alert('did enter')
  }

  SignIn(data: any, from: string) {
    this.authService.SignInPortal(data, from)
      .then((result) => {
        this.loadingService.isLoading.next(false)
        if (result != "SUCCESS") {
          this.global.tenant = 'ProPlus';
          this.authService.setUser(this.global.tenant).then(() => { this.userLogged = true; });
        }
        else { this.userLogged = true; }
      })
      .catch(() => this.loadingService.isLoading.next(false))
  }

  showPDF() {
    let id = "fe6ec135-9587-4e73-ae6f-0c5ee26f11c4";
    this.documentosService.getFile(id).then((data: any) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.blobFile = data;
        this.file = fileReader.result;
        this.pdfSrc = new Uint8Array(fileReader.result as ArrayBuffer);
        this.loaddoc = true;
      };
      fileReader.readAsArrayBuffer(data);
    })
  }
  onPageRendered() {
  }
}