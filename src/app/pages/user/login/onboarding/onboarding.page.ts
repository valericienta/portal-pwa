import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  discardOnBoarding: boolean;
  constructor(public router: Router) { }

  ngOnInit() { }

  goHome() {
    let discard = this.discardOnBoarding ? "true" : "false";
    localStorage.setItem("discardOnBoarding", discard);
    this.router.navigate(['/home']);
  }
}
