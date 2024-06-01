import { Injectable } from '@angular/core';
import { AppUpdate,AppUpdateAvailability } from '@capawesome/capacitor-app-update';

@Injectable({
  providedIn: 'root'
})
export class UpdateStoresService {

  getCurrentAppVersion = async () => {
    const result = await AppUpdate.getAppUpdateInfo();
    return result.currentVersionCode;
  };
  
  getAvailableAppVersion = async () => {
    const result = await AppUpdate.getAppUpdateInfo();
    return result.availableVersionName;
  };
  
  openAppStore = async () => {
    await AppUpdate.openAppStore();
  };
  
  performImmediateUpdate = async () => {
    const result = await AppUpdate.getAppUpdateInfo();
    if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
      return;
    }
    if (result.immediateUpdateAllowed) {
      await AppUpdate.performImmediateUpdate();
    }
  };
  
  startFlexibleUpdate = async () => {
    const result = await AppUpdate.getAppUpdateInfo();
    if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
      return;
    }
    if (result.flexibleUpdateAllowed) {
      await AppUpdate.startFlexibleUpdate();
    }
  };
  
  completeFlexibleUpdate = async () => {
    await AppUpdate.completeFlexibleUpdate();
  };

  constructor() { }
}
