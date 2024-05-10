import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {

  isLoading: Subject<boolean> = this.loadingService.isLoading;
  constructor(public loadingService: LoadingService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  dismiss(){
    this.isLoading.next(false);
  }
}
