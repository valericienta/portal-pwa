import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-notenant-alert',
  templateUrl: './notenant-alert.component.html',
  styleUrls: ['./notenant-alert.component.scss'],
})
export class NotenantAlertComponent implements OnInit {
  @Output() backToLogin: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}

  SignOut() {
    this.authService.SignOut();
    this.backToLogin.emit();
  }
}
