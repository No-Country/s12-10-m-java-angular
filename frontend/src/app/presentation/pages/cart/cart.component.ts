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

  constructor(public cartService: CartService) {
    this.booksWQ = cartService.bringCartOfServiceWithQuantity();
    console.log(this.booksWQ)
   }

  ngOnInit(): void {
  }

  discardBook(bookToRemove: BookDetail){
    this.booksWQ = this.booksWQ.filter(bookWithQuantity => bookWithQuantity.book.ID !== bookToRemove.ID);
    this.cartService.deleteBookToCart(bookToRemove)
  }

}
