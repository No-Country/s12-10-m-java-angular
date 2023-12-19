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
import { Observer, Subject, delay, first, map, of, takeUntil } from 'rxjs';
import { ShopRoutes } from './shop.routing';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import {
  BookDetail,
  BookFilterProps,
  GENRES,
  Genre,
} from 'app/data/models/book';
import { SORTING_VALUES, Sorting } from 'app/data/models/Sort';
import { SortBoxComponent } from '@presentation/components/sort-box/sort-box.component';
import { ShopFiltersComponent } from '@presentation/components/shop-filters/shop-filters.component';
import { CardBookHorizontalComponent } from '@presentation/components/card-book-horizontal/card-book-horizontal.component';
import { BooksService } from 'app/data/services/books/books.service';
import { SpinnerComponent } from '@presentation/components/app-spinner/spinner.component';
import { OverlayComponent } from '@presentation/components/overlay/overlay.component';
import { ShopFilterMobileComponent } from '@presentation/components/shop-filters/mobile/shop-filter-mobile.component';
import { FilterService } from 'app/data/services/shop/filter.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartService } from 'app/data/services/cart/cart.service';

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
    ShopFilterMobileComponent,
    OverlayComponent,
    NgxPaginationModule,
  ],
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent implements OnInit, OnDestroy {
  private router: ActivatedRoute = inject(ActivatedRoute);
  private readonly shopService: ShopService = inject(ShopService);
  public readonly filterService: FilterService = inject(FilterService);
  private destroy$: Subject<void>;
  protected readonly books = this.shopService.state.asReadonly();
  protected searchTerm: string = '';
  protected sortParam: string = '';
  protected genreParam: string = '';
  protected loading: WritableSignal<boolean>;

  protected openMobileFilter: boolean = false;

  protected booksWithOnCart: (BookDetail & { onCart: boolean })[]=[];

  constructor(private injector: Injector, private cartService: CartService) {
    this.loading = signal(false);

    this.router.queryParams.subscribe((params) => {
      this.searchTerm = params['search'] as string;
      this.filterService.verifySorting(params['sort'] as string);
      this.filterService.verifyGenre(params['genre'] as string);

      this.filterService.initFilterProps(
        (this.searchTerm !== undefined && this.searchTerm !== 'All') ? this.searchTerm : ''
      );
    });

    this.destroy$ = new Subject();



  }

  ngOnDestroy(): void {
    this.filterService.deleteCacheProps();
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    const loading = this.loading;
    const shopService = this.shopService;
    window.scroll({top: 0})
    this.filterService.updateResultList
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe((updateProps) => {
        loading.update((current) => !current);

        shopService
          .getLeakedsBooks(updateProps)
          .pipe(first())
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (books) => {
              shopService.setState(books);
              loading.update((current) => !current);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      });

      /*effect(() => {
        const booksState = this.books().content;
        const BooksOnCart: BookDetail[]=this.cartService.bringCartOfService();
        if(booksState !== undefined){
          this.booksWithOnCart = booksState.map(book => {
            let onCart = BooksOnCart.some(cartBook => cartBook.id === book.id);
            return { ...book, onCart };
          });
        }
      },{injector: this.injector});*/
  }

  getBooks() {
    return this.books().content;
  }

  updatePage(page: any){
    this.filterService.updatePagination(page);
    window.scroll({top: 0});
  }
}
