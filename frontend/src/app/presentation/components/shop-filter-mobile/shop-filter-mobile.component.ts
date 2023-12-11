import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { SORTING_VALUES, Sorting } from 'app/data/models/Sort';
import { GENRES, Genre, LANGUAGES, Language } from 'app/data/models/book';

@Component({
  selector: 'shop-filter-mobile',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './shop-filter-mobile.component.html',
  styleUrl: './shop-filter-mobile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopFilterMobileComponent implements OnInit {

  protected LANGUAGES: Language[] = LANGUAGES;
  protected SORTING: Sorting[] = SORTING_VALUES;
  protected GENRES: Genre[] = GENRES;
  constructor(){

  }

  ngOnInit(): void { }

}
