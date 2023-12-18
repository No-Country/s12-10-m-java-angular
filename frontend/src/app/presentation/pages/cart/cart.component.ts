import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CardBookComponent } from '@presentation/components/card-book/card-book.component';
import { BookDetail } from 'app/data/models/book';
import { Observable, delay, of } from 'rxjs';
import { FooterComponent } from '@presentation/components/footer/footer.component';
import { Navbar2Component } from '@presentation/components/navbar-2/navbar-2.component';
import { NavbarComponent } from '@presentation/components/navbar/navbar.component';
import { CartCardComponent } from '@presentation/components/cart-card/cart-card.component';
import { CartService } from 'app/data/services/cart/cart.service';


@Component({
  standalone: true,
  imports: [CommonModule, NavbarComponent, Navbar2Component, FooterComponent, CardBookComponent, CartCardComponent],
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit {
  protected booksWQ: { book: BookDetail, quantity: number }[];
  public total: number = 0;

  constructor(public cartService: CartService) {
    this.booksWQ = cartService.bringCartOfServiceWithQuantity();
    this.total=this.booksWQ.reduce((total, bookToCalculate) => total + bookToCalculate.quantity*bookToCalculate.book.price, 0);
    console.log(this.booksWQ)
   }

  ngOnInit(): void {
  }

  discardBook(bookToRemove: { book: BookDetail, quantity: number }){
    this.booksWQ = this.booksWQ.filter(bookWithQuantity => bookWithQuantity.book.id !== bookToRemove.book.id);
    this.cartService.deleteBookToCart(bookToRemove.book)
    this.total=this.total-bookToRemove.book.price*bookToRemove.quantity;
  }

  editquantityOf(bookToEditQuantity: { book: BookDetail, quantity: number }){
    this.booksWQ.map(bookOfCart =>{
      console.log(bookOfCart,bookToEditQuantity)
      if(bookOfCart.book.id == bookToEditQuantity.book.id){
        console.log(bookOfCart.book.id,'vs',bookToEditQuantity.book.id)
        console.log(bookOfCart.book.author)
        bookOfCart.quantity=bookToEditQuantity.quantity;
        return bookOfCart
      }
      else{
        return bookOfCart;
      }
    }
    )
    this.total=this.booksWQ.reduce((total, bookToCalculate) => total + bookToCalculate.quantity*bookToCalculate.book.price, 0);
  }

}
