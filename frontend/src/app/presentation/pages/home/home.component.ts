import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TrendingComponent } from './layouts/trending/trending.component';
import { NewsLetterComponent } from './layouts/news-letter/news-letter.component';
import { NewArribalComponent } from './layouts/new-arribal/new-arribal.component';
import { HeroComponent } from './layouts/hero/hero.component';
import { BowserCategoriesComponent } from './layouts/bowser-categories/bowser-categories.component';

@Component({
  standalone: true,
  imports: [CommonModule, BowserCategoriesComponent, HeroComponent, NewArribalComponent, NewsLetterComponent, TrendingComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
