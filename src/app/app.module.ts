import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';



import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { InterceptorService } from './interceptors/http.interceptor';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/pro-solid-svg-icons'
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fal } from '@fortawesome/pro-light-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { IPublicClientApplication, PublicClientApplication, BrowserCacheLocation, LogLevel, InteractionType } from '@azure/msal-browser';
import { MSAL_INSTANCE,  MSAL_INTERCEPTOR_CONFIG,  MsalInterceptorConfiguration,  MSAL_GUARD_CONFIG,  MsalGuardConfiguration,  MsalBroadcastService,  MsalService, MsalGuard,  MsalModule,  MsalInterceptor} from '@azure/msal-angular';
import { environment } from 'src/environments/environment';
import { LoaderComponent } from './components/loader/loader.component';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
export function loggerCallback(logLevel: LogLevel, message: string) {
  // console.info(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msal.appId,
      authority: environment.msal.authority,
      redirectUri: environment.msal.redirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE,
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    }
  };
}


@NgModule({
  declarations: [AppComponent,LoaderComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HttpClientModule,
    MsalModule,
    FontAwesomeModule,
   ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
    { provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory },
    { provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSALInterceptorConfigFactory },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    InAppBrowser
],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) { 
	  library.addIconPacks(fas, fad, fal,fab);
	}

}
