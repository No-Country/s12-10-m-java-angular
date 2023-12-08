import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  Renderer2,
  Signal,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBookComponent } from '@presentation/components/card-book/card-book.component';
import { FooterComponent } from '@presentation/components/footer/footer.component';
import { Navbar2Component } from '@presentation/components/navbar-2/navbar-2.component';
import { NavbarComponent } from '@presentation/components/navbar/navbar.component';
import { BOOK_DETAIL_MOOK } from 'app/data/mocks/booksArray';
import { ShopService } from 'app/data/services/shop/shop.service';
import { delay, map, of } from 'rxjs';
import { ShopRoutes } from './shop.routing';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { BookDetail, BookFilterProps, GENRES, Genre } from 'app/data/models/book';
import { SORTING_VALUES, Sorting } from 'app/data/models/Sort';
import { SortBoxComponent } from '@presentation/components/sort-box/sort-box.component';
import { ShopFiltersComponent } from '@presentation/components/shop-filters/shop-filters.component';
import { CardBookHorizontalComponent } from '@presentation/components/card-book-horizontal/card-book-horizontal.component';
import { BooksService } from 'app/data/services/books/books.service';
import { SpinnerComponent } from '@presentation/components/app-spinner/spinner.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    Navbar2Component,
    FooterComponent,
    CardBookComponent,
    DefaultButtonComponent,
    SortBoxComponent,
    ShopFiltersComponent,
    CardBookHorizontalComponent,
    SpinnerComponent,
  ],
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit, OnDestroy {
  private router: ActivatedRoute = inject(ActivatedRoute);
  private readonly shopService: ShopService = inject(ShopService);

  protected readonly books = this.shopService.state.asReadonly();

  protected readonly searchTerm: string = '';
  protected readonly sortParam: string = '';
  protected readonly genreParam: string = '';

  protected SORT: Sorting[];
  private readonly GENRES: Genre[] = GENRES;
  protected initGenre: Genre;
  protected loading: WritableSignal<boolean>;

  constructor(private injector: Injector) {
    this.loading = signal(true);
    this.searchTerm = this.router.snapshot.queryParams['search'] as string;
    this.sortParam = this.router.snapshot.queryParams['sort'] as string;
    this.genreParam = this.router.snapshot.queryParams['genre'] as string;
    this.initGenre = Genre.DEFAULT;
    this.SORT = SORTING_VALUES;
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('props');
  }

  ngOnInit(): void {
    this.verifySorting();
    this.verifyGenre();
    this.initFilterProps();
    let props = JSON.parse(
      sessionStorage.getItem('props') as string
    ) as BookFilterProps;
    this.shopService.getLeakedsBooks(props).subscribe({
      next: (books) => {
        this.shopService.setState(books);
        this.loading.update((current) => !current);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  private initFilterProps(): void {
    sessionStorage.setItem(
      'props',
      JSON.stringify({
        page: 0,
        size: 9,
        orderBy: this.SORT[0].code.startsWith('alpha')
          ? 'alphabetically'
          : this.SORT[0].code,
        ascOrDesc: this.SORT[0].order,
        searchEvenNotAvailable: 0,
        genre:
          this.initGenre && this.initGenre.valueOf() !== Genre.DEFAULT.valueOf()
            ? [this.initGenre.valueOf()]
            : undefined,
      })
    );
  }
  private verifyGenre() {
    if (this.genreParam !== '' && this.genreParam) {
      let { genre } = this.GENRES.reduce(
        (genreSearch, item, currentIndex) => {
          if (item.valueOf() === this.genreParam)  genreSearch.genre = item;
          return genreSearch;
        },
        { genre: Genre.DEFAULT }
      );
      if(genre !== Genre.DEFAULT && genre) this.initGenre = genre;

    }

  }

  private verifySorting(): void {
    if (this.sortParam !== '' && this.sortParam) {
      let { index, element } = this.SORT.reduce(
        (acc, item, currentIndex) => {
          if (item.code === this.sortParam) {
            acc.index = currentIndex;
            acc.element = item;
          }
          return acc;
        },
        { index: -1, element: {} as Sorting }
      );

      if (index !== -1) {
        this.SORT = [
          element,
          ...this.SORT.slice(0, index),
          ...this.SORT.slice(index + 1),
        ];
        console.log('update sort', this.SORT);
      }
    }
  }

  updateList(filterProps: BookFilterProps): void {
    this.loading.update((current) => !current);
    console.log("props",filterProps);
    this.shopService.getLeakedsBooks(filterProps).subscribe({
      next: (books) => {
        this.shopService.setState(books.content);
        this.loading.update((current) => !current);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  applySort(sort: Sorting) {
    let props = JSON.parse(
      sessionStorage.getItem('props') as string
    ) as BookFilterProps;

    props.ascOrDesc = sort.order.valueOf();

    if (sort.code.startsWith('alpha'))
      props.orderBy = sort.code.substring(0, sort.code.lastIndexOf('-'));
    else props.orderBy = sort.code;

    this.updateList(props);
  }

  getBooks() {
    return Object.values(this.books().content);
  }
}
