import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-skeleton',
  templateUrl: './item-skeleton.component.html',
  styleUrls: ['./item-skeleton.component.scss'],
})
export class ItemSkeletonComponent implements OnInit {
  @Input() size: number;
  items: any[] = [];
  constructor() {}

  ngOnInit() {
    for (let i = 0; i < this.size; i++) {
      this.items.push({});
    }
  }
}
