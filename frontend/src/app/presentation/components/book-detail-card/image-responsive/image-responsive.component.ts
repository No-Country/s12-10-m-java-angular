import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from 'app/data/models/book';

@Component({
  selector: 'app-image-responsive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-responsive.component.html',
  styleUrl: './image-responsive.component.css',
  
})
export class ImageResponsiveComponent {

  @Input() public book: Book;

  constructor(){
    this.book = {} as Book;
  }

  isNumberId(ID: string | number) {
    return typeof ID === 'string'; 
  }
  currentIndex: number = 1;
  /*FALTA REEMPLAZAR ESTO POR LAS IMAGENES DEL BACK */
  images: string[] = [
    "/assets/booksImages/1.jpg",
    "/assets/booksImages/2.jpg",
    "/assets/booksImages/3.jpg",
  ];
  @ViewChild('imageSlider') imageSlider!: ElementRef;
  private touchStartX: number = 0;
 
  ngOnInit(): void {
    this.initTouchEvents();
  }

  initTouchEvents(): void {
    if (this.imageSlider) {
      const slider = this.imageSlider.nativeElement;

      slider.addEventListener('touchstart', (event: TouchEvent) => this.onTouchStart(event));
      slider.addEventListener('touchmove', (event: TouchEvent) => this.onTouchMove(event));
    }
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent): void {
    const touchEndX = event.touches[0].clientX;

    if (touchEndX < this.touchStartX) {
      this.forward();
    } else if (touchEndX > this.touchStartX) {
      this.previous();
    }
  }

  previous(): void {
    if (this.currentIndex > 1) {
      this.currentIndex = this.currentIndex - 1;
    } else {
      this.currentIndex = this.images.length;
    }
  }

  forward(): void {
    if (this.currentIndex < this.images.length) {
      this.currentIndex = this.currentIndex + 1;
    } else {
      this.currentIndex = 1;
    }
  }
}
