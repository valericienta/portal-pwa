import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OneSignalService {

  constructor(public platform: Platform) { }


  OneSignalInit() {
    if (this.platform.is('capacitor')) {
      {
        OneSignal.initialize(environment.onesignal.appId);

        OneSignal.Notifications.addEventListener('click', async (e) => {
          let clickData = await e.notification;
          console.log("Notification Clicked : " + clickData);
        })

        OneSignal.Notifications.requestPermission(true).then((success: Boolean) => {
          console.log("Notification permission granted " + success);
        })

      }
    }

  }

}
