import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize,catchError, throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

  urlLoadingExcluded = ['/token', '/social', '/tenants', '/file']

  constructor(public loadingService: LoadingService) {

  }


  endsWithAny(list: string[], url: string) {
    return list.some(function (list) {
      return url.endsWith(list);
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> { 
    let showLoading = !this.endsWithAny(this.urlLoadingExcluded,request.url);
   if (showLoading) this.loadingService.show();
    return next.handle(request)
    .pipe(
      catchError((error:any) => {
       this.loadingService.hide();
        return throwError(() => error)
      }),
      finalize(() => {
        if (showLoading) this.loadingService.hide()
      }));
  }

}
