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
  constructor(public router: Router) {}

  ngOnInit() {}

  goHome() {
    this.router.navigate(['/home']);
  }
}
