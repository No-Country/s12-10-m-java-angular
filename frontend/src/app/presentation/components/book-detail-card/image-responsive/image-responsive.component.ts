import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from 'app/data/models/book';

@Component({
  selector: 'app-image-responsive',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-responsive.component.html',
  styleUrl: './image-responsive.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageResponsiveComponent {
  @Input() public book: Book;

  constructor() {
    this.book = {} as Book;
  }

  isNumberId(ID: string | number) {
    return typeof ID === 'string';
  }

  currentIndex: number = 1;

  @ViewChild('imageSlider') imageSlider!: ElementRef;
  private touchStartX: number = 0;

  ngOnInit(): void {
    this.initTouchEvents();
    console.log(this.book.urlImages);
  }

  ngAfterViewInit(): void {
    this.initTouchEvents();
  }

  initTouchEvents(): void {
    if (this.imageSlider) {
      const slider = this.imageSlider.nativeElement;

      slider.addEventListener('touchstart', (event: TouchEvent) =>
        this.onTouchStart(event)
      );
      slider.addEventListener('touchmove', (event: TouchEvent) =>
        this.onTouchMove(event)
      );
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
      this.currentIndex = this.book.urlImages.length;
    }
  }

  forward(): void {
    if (this.currentIndex < this.book.urlImages.length) {
      this.currentIndex = this.currentIndex + 1;
    } else {
      this.currentIndex = 1;
    }
  }
}
