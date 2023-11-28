import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'bowser-categories-layout',
  templateUrl: './bowser-categories.component.html',
  styleUrls: ['./bowser-categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BowserCategoriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
