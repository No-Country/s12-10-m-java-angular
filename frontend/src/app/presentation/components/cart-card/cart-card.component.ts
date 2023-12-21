import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ChangeDetectorRef  } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Book, BookDetail } from '../../../data/models/book';
import { RouterLink } from '@angular/router';
import { DefaultButtonComponent } from '../default-button/default-button.component';
import { CartService } from 'app/data/services/cart/cart.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-cart-card',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    DefaultButtonComponent,
    FormsModule,
  ],
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartCardComponent {
  @Input() public bookOfCard: { book: BookDetail; quantity: number };
  @Output() public deleteBook = new EventEmitter<BookDetail>();
  @Output() public bookWithNewQuantity = new EventEmitter<{
    book: BookDetail;
    quantity: number;
  }>();
  $Event: any;
  oldQuantity!: number;

  constructor(public cartService: CartService, private cdRef: ChangeDetectorRef) {
    this.bookOfCard = {} as { book: BookDetail; quantity: number };
    this.oldQuantity = this.bookOfCard.quantity
  }

  isNumberId(ID: string | number) {
    return typeof ID === 'string';
  }

  decreaseQuantity() {
    if(this.bookOfCard.quantity > 1){
      this.bookOfCard.quantity = this.bookOfCard.quantity - 1;
    }
  }

  increaseQuantity() {
    this.bookOfCard.quantity = this.bookOfCard.quantity + 1;
  }

  onNumeroChange(bookOfCard: { book: BookDetail; quantity: number }) {

    if(bookOfCard.quantity>0 && Number.isInteger(bookOfCard.quantity) ){
      this.cartService.changeQuantityTo(bookOfCard);
      console.log(bookOfCard.book.name, bookOfCard.quantity);
      this.bookWithNewQuantity.emit(bookOfCard);
      this.oldQuantity=this.bookOfCard.quantity;
      console.log('oldq',this.oldQuantity)
    }
    else{
    }

  }

  onBlur(){
    this.bookOfCard.quantity=this.oldQuantity;
    this.cdRef.detectChanges();
  }
}
