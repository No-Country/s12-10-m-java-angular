import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
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
import { BookDetail, BookFilterProps } from 'app/data/models/book';
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
export class ShopComponent implements OnInit {
  private router: ActivatedRoute = inject(ActivatedRoute);
  private readonly shopService: ShopService = inject(ShopService);

  protected readonly books = this.shopService.state.asReadonly();

  protected readonly searchTerm: string = '';
  protected readonly SORT: Sorting[];
  protected loading: WritableSignal<boolean>;

  constructor(private injector: Injector) {
    this.loading = signal(true);
    this.searchTerm = this.router.snapshot.queryParams['search'] as string;
    this.SORT = SORTING_VALUES;
  }

  ngOnInit(): void {
    /*of(BOOK_DETAIL_MOOK)
      .pipe(delay(1500))
      .subscribe((data) => {
        this.shopService.setState(data);
        this.loading.update((current)=>!current);
      });*/
    let props = JSON.parse(
      sessionStorage.getItem('props') as string
    ) as BookFilterProps;
    this.shopService.getLeakedsBooks(props).subscribe({
      next: (books) => {
        this.shopService.setState(books.content);
        this.loading.update((current) => !current);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  updateList(filterProps: BookFilterProps): void {
    this.loading.update((current) => !current);
    this.shopService.getLeakedsBooks(filterProps).subscribe({
      next: (books) => {
        this.shopService.setState(books.content);
        this.loading.update((current) => !current);
      },
      error: (err: any) => {
        console.log(err);
      },
    });;
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
    return Object.values(this.books());
  }
}
