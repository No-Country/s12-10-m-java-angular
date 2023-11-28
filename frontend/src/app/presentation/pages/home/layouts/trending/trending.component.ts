import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'trending-layout',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrendingComponent implements OnInit {

  constructor() { }

  ngOnInit():void {
  }

}
