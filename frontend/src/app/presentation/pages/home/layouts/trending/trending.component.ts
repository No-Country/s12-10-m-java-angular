import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { BOOK_DETAIL_MOOK } from 'app/data/mocks/booksArray';
import { BookDetail } from 'app/data/models/book';
import { CardBookComponent } from "../../../../components/card-book/card-book.component";

@Component({
    standalone: true,
    selector: 'trending-layout',
    templateUrl: './trending.component.html',
    styleUrls: ['./trending.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, CardBookComponent]
})
export class TrendingComponent implements AfterViewInit{

  protected booksArray: BookDetail[];

  constructor() {this.booksArray = BOOK_DETAIL_MOOK;}

  @ViewChild('bookList') bookList!: ElementRef;

  ngAfterViewInit(): void{
    if(this.bookList){
      const list = this.bookList.nativeElement;
    }
  }

  moveCarrusel(direccion: 'left' | 'right'): void {
    console.log('1');

    const scrollAmount = 259;
    if(this.bookList){
      const list = this.bookList.nativeElement;
      if (direccion === 'left') {
        console.log('l');
        list.scrollLeft -= scrollAmount;
      } else if (direccion === 'right') {
        console.log('r');
        list.scrollLeft += scrollAmount;
      }
    }

  }
  
}
