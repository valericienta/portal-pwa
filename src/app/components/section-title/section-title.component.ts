import { Component, Input, OnInit } from '@angular/core';
import { Section } from './../../interfaces/UI/section-title.interface';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss'],
})
export class SectionTitleComponent implements OnInit {
  @Input() section: Section;

  constructor() {}

  ngOnInit() {}
}
