import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TrendingComponent } from './layouts/trending/trending.component';
import { NewsLetterComponent } from './layouts/news-letter/news-letter.component';
import { NewArribalComponent } from './layouts/new-arribal/new-arribal.component';
import { HeroComponent } from './layouts/hero/hero.component';
import { BowserCategoriesComponent } from './layouts/bowser-categories/bowser-categories.component';
import { FavoriteBookComponent } from './layouts/favorite-book/favorite-book.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavbarComponent } from '@presentation/components/navbar/navbar.component';
import { Navbar2Component } from '@presentation/components/navbar-2/navbar-2.component';

@Component({
    standalone: true,
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      CommonModule, 
      BowserCategoriesComponent, 
      HeroComponent, 
      FavoriteBookComponent, 
      NewArribalComponent, 
      NewsLetterComponent, 
      TrendingComponent, 
      FooterComponent,
      NavbarComponent,
      Navbar2Component
    ]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
