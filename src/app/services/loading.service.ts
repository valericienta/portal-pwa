import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = new Subject<boolean>();
  
  constructor(private global: GlobalService) { }


  show() { 
    // this.global.isLoading=true;
    this.isLoading.next(true); 
  }

  hide() { 
    // this.global.isLoading=false;
     this.isLoading.next(false); }

}
