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

  urlTokenExcluded: string[] = ['/token', '/social'];

  constructor(public router: Router,
    public toastService: ToastService,
    public global: GlobalService) {
  }


  endsWithAny(list: string[], url: string) {
    return list.some(function (list) {
      return url.endsWith(list);
    });
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url;
    if (url.includes('assets')) {    return next.handle(req) }
    else {
      let addToken = !this.endsWithAny(this.urlTokenExcluded, url);

      if (addToken) {
        let token = localStorage.getItem("token");
        if (token)
          if (url.includes('auth/'))
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token), url: environment.hostAPI + req.url });
          else
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token), url: environment.hostAPI + this.global.tenant + req.url });
      }
      else {
        req = req.clone({ headers: req.headers, url: environment.hostAPI + req.url });
      }

      let mensaje = "";
      return next.handle(req).pipe(
        catchError((error) => {
          if (error.error.exception) { //devueltos por la API
            switch (error.error.exception) {
              case "Authentication Failed.":
                mensaje = "Su sesión ha caducado", "danger";
                break;
              case "Token inválido o no existe.":
                this.router.navigate(['/login']);
                break;
              default:
                mensaje = error.error.exception;
                break;
            }
          }
          else mensaje = error.message;
          if (mensaje != "") this.toastService.present(mensaje, "danger")
          if (error.status == 401) {
            this.router.navigate(['/login']);
          }
          return throwError(() => error);
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
