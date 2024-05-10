import { NavigationClient } from "@azure/msal-browser";
import { Capacitor } from "@capacitor/core";
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { environment } from "src/environments/environment";

export class CustomNavigationClient extends NavigationClient {

    constructor(private iab: InAppBrowser) {
      super();
    }
  
    override async navigateExternal(url: string, options: any) {
      if (Capacitor.isNativePlatform()) {
        const browser = this.iab.create(url, '_blank', {
          location: 'yes',
          clearcache: 'yes',
          clearsessioncache: 'yes',
          hidenavigationbuttons: 'yes',
          hideurlbar: 'yes',
          fullscreen: 'yes'
        });

        browser.on('loadstart').subscribe(event => {
          if (event.url.includes('#code')) {
            browser.close();            
            const domain = event.url.split('#')[0];    
            // const url = event.url.replace(domain, 'https://localhost/login');
            const url = event.url.replace(domain, environment.msal.redirectUri);
            window.location.href = url;
          }
        });
      } else {
        if (options.noHistory) {
          window.location.replace(url);
        } else {
          window.location.assign(url);
        }
      }
      return true;
    }
  }