import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, AfterViewInit, HostListener, OnInit, ChangeDetectorRef } from '@angular/core';
import { BookDetail, BookFilterProps, BookPagination, GENRES, LANGUAGES } from 'app/data/models/book';
import { CardBookComponent } from "../../../../components/card-book/card-book.component";
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { CardBookHorizontalComponent } from '@presentation/components/card-book-horizontal/card-book-horizontal.component';
import { CartService } from 'app/data/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { TrendingServiceService } from 'app/data/services/trending/trending-service.service';
import { LoginService } from 'app/data/services/login/login.service';
import { LoggedInService } from 'app/data/services/login/loggedIn.service';

@Component({
    standalone: true,
    selector: 'trending-layout',
    templateUrl: './trending.component.html',
    styleUrls: ['./trending.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, CardBookComponent, CardBookHorizontalComponent, DefaultButtonComponent, RouterLink]
})
export class TrendingComponent implements AfterViewInit, OnInit{

  public booksArray!: BookDetail[];
  protected classOfCard: string = "";
  protected scrollAmount: number = 279;
  protected screenWidth: number = window.innerWidth;
  protected BooksOnCart: BookDetail[]=[]; //servicio booksOnCart

  protected filterProps: BookFilterProps={
    page: 1,
    size: 12,
  
    minPrice: 0,
    maxPrice: 9999999,
  
    minPage: 9999999,
    genre: GENRES,
  
    language: LANGUAGES,
    searchEvenNotAvailable: 1,
  
    orderBy: 'salesAmount',
    ascOrDesc: 'asc',
  };

  constructor(private trendingService: TrendingServiceService, private cdr: ChangeDetectorRef, private loggedInService: LoggedInService ) {
  }

  ngOnInit(){
    this.trendingService.getHighestRatedBooks().subscribe(
      arrayOfBooks => {
        console.log('Array de libros:', arrayOfBooks);
        this.booksArray = arrayOfBooks;
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error al obtener los libros:', error);
      }
    );
    console.log(this.loggedInService.isLogged())
  }

  @ViewChild('bookList') bookList!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.updateScrollAmount();
  }

  ngAfterViewInit(): void{
    if(this.bookList){
      const list = this.bookList.nativeElement;
    }
    this.updateScrollAmount();
  }

    private updateScrollAmount(): void {
    const screenWidth = window.innerWidth;
    this.scrollAmount = screenWidth < 705 ? screenWidth : 279;
  }

  moveCarrusel(direccion: 'left' | 'right'): void {
    if(this.bookList){
      const list = this.bookList.nativeElement;
      if (direccion === 'left') {
        console.log('l');
        list.scrollLeft -= this.scrollAmount+10;
      } else if (direccion === 'right') {
        console.log('r');
        list.scrollLeft += this.scrollAmount+10;
      }
    }

  }

}
