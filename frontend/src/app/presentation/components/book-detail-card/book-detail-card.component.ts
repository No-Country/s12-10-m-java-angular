import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DefaultButtonComponent } from '../default-button/default-button.component';
import { Book } from 'app/data/models/book';
import { ImageResponsiveComponent } from './image-responsive/image-responsive.component';
import { Router } from '@angular/router';
import { CartService } from 'app/data/services/cart/cart.service';
import { ModalBuyComponent } from '../modal-buy/modal-buy.component';

@Component({
  selector: 'app-detail-card',
  standalone: true,
  imports: [
    CommonModule,
    DefaultButtonComponent,
    NgOptimizedImage,
    ImageResponsiveComponent,
    ModalBuyComponent
  ],
  templateUrl: './book-detail-card.component.html',
  styleUrl: './book-detail-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailCardComponent {
  selectedImageUrl: string = '';
  @Input() public book: Book;
  @Input() public onCart: boolean = false;
  modalAbierto: boolean = false;

  constructor(private router: Router,
    private cartService: CartService) {
    this.book = {} as Book;
  }

  addOrRemove() {
    const bookToAdd = {
      id: this.book.idBook,
      name: this.book.title,
      image: this.book.urlImages[0],
      author: this.book.author,
      price: this.book.price,
      description: this.book.description
    };
    this.onCart
      ? this.cartService.deleteBookToCart(bookToAdd)
      : this.cartService.addBookToCart(bookToAdd);
    this.onCart = !this.onCart;
  }

  isNumberId(ID: string | number) {
    return typeof ID === 'string';
  }

  setSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }

  scrollToPayment(): void {
    const paymentSection = document.getElementById('payment');
    if (paymentSection) {
      paymentSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  redirectToAuthor() {
    this.router.navigate(['shop'], {
      queryParams: { search: this.book.author },
    });
  }

  abrirModal() {
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
}
