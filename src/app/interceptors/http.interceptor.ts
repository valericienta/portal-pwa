import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { GlobalService } from '../services/global.service';
import { ToastService } from '../services/toast.service';
import { Usuario } from '../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  urlTokenExcluded: string[] = ['/token', '/social', '/refresh'];
  urlAllPortal: string[] = [];

  constructor(public router: Router,
    public toastService: ToastService,
    public global: GlobalService) {
  }


  excludeToken(url: string): boolean {
    return this.urlTokenExcluded.some(s => url.endsWith(s));
  }

  excludePortal(url: string): boolean {
    return this.urlAllPortal.some(s => url.endsWith(s));
  }

  // if (this.excludePortal(req.url)) newURL = environment.hostAPI + this.global.tenant + req.url; else
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newURL = '';
    let addToken = !this.excludeToken(req.url);
    if (req.url.includes('assets')) return next.handle(req)
    else {
      if (addToken) {
        let token = localStorage.getItem("token");
        if (token) {
          if (req.url.includes('auth/')) newURL = environment.hostAPI + req.url;
          else newURL = environment.hostAPI + this.global.tenant + "/portal" + req.url;
          req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token), url: newURL });
        }
      }
      else req = req.clone({ headers: req.headers, url: environment.hostAPI + req.url });

      let mensaje = "";
      return next.handle(req).pipe(
        catchError((response) => {        
          if (response.error) { 
            switch (response.error.exception) {
              case "Authentication Failed.":
                mensaje = "Su sesión ha caducado", "danger";
                break;
              case "Token inválido o no existe.":
                this.router.navigate(['/login']);
                break;
              default:
                mensaje = response.error.exception;
                break;
            }
          }
          else 
             mensaje = JSON.stringify(response);

          
          if (mensaje != "") this.toastService.present(mensaje, "danger")
          if (response.status == 401) {
            this.router.navigate(['/login']);
          }
          return throwError(() => response);
        }),
        finalize(() => {
        }))
    }

  }

  cleanStorage() {
    this.global.user = new Usuario();
    this.global.tenants = [];
    this.global.tenant = '';
    localStorage.clear();
  }
}
