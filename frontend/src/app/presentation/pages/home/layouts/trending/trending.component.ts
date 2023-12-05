import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { BOOK_DETAIL_MOOK } from 'app/data/mocks/booksArray';
import { BookDetail } from 'app/data/models/book';
import { CardBookComponent } from "../../../../components/card-book/card-book.component";
// import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component'; DefaultButtonComponent
import { CardBookHorizontalComponent } from '@presentation/components/card-book-horizontal/card-book-horizontal.component';

@Component({
    standalone: true,
    selector: 'trending-layout',
    templateUrl: './trending.component.html',
    styleUrls: ['./trending.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, CardBookComponent, CardBookHorizontalComponent]
})
export class TrendingComponent implements AfterViewInit{

  protected booksArray: BookDetail[];
  protected classOfCard: string = "";
  protected scrollAmount: number = 279;
  protected screenWidth: number = window.innerWidth;

  constructor() {this.booksArray = BOOK_DETAIL_MOOK;}

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
    this.scrollAmount = screenWidth < 617 ? screenWidth : 279;
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

  onScroll(): void {/*
    if (this.bookList) {
      const list = this.bookList.nativeElement;

      // Obtén la posición del centro de la pantalla
      const centerPosition = window.innerWidth / 2;

      // Itera sobre las tarjetas y aplica efectos según su distancia al centro
      const cards = list.querySelectorAll('.card-book'); // Ajusta el selector según tu implementación
      cards.forEach((card: HTMLElement) => {
        const cardPosition = card.getBoundingClientRect().left + card.offsetWidth / 2;
        console.log(card.getBoundingClientRect().left + card.offsetWidth / 2)
        console.log('center position',centerPosition)
        console.log('resta',centerPosition - cardPosition)

        // Calcula la distancia al centro
        const distanceToCenter = Math.abs(centerPosition - cardPosition);

        // Aplica efectos según la distancia
        // Puedes ajustar estos valores según tus necesidades
        if (distanceToCenter < 800) {
          // La tarjeta está cerca del centro
          // Aplica un efecto especial
          //card.classList.add('near-center-effect');
          this.classOfCard='near-center-effect'
        } else {
          // La tarjeta no está cerca del centro
          // Elimina el efecto especial si estaba aplicado
          //card.classList.remove('near-center-effect');
          //this.classOfCard='near-center-effect'
        }
      });
    }*/
  }
  
}
