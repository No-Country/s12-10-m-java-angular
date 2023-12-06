import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardBookComponent } from '@presentation/components/card-book/card-book.component';
import { FooterComponent } from '@presentation/components/footer/footer.component';
import { Navbar2Component } from '@presentation/components/navbar-2/navbar-2.component';
import { NavbarComponent } from '@presentation/components/navbar/navbar.component';
import { BOOK_DETAIL_MOOK } from 'app/data/mocks/booksArray';
import { ShopService } from 'app/data/services/shop/shop.service';
import { of } from 'rxjs';
import { ShopRoutes } from './shop.routing';
import { DefaultButtonComponent } from '@presentation/components/default-button/default-button.component';
import { BookDetail } from 'app/data/models/book';

@Component({
  standalone: true,
  imports: [
    CommonModule, 
    NavbarComponent, 
    Navbar2Component, 
    FooterComponent,
    CardBookComponent,
    DefaultButtonComponent
  ],
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent implements OnInit {
  private router: ActivatedRoute = inject(ActivatedRoute);
  private readonly shopService = inject(ShopService);

  protected readonly books = this.shopService.state.asReadonly();
  protected readonly searchTerm: string = "";

  constructor() { 
    this.searchTerm = this.router.snapshot.paramMap.get("searchTerm") as string;
    
    
  }

  ngOnInit(): void {
    this.shopService.setState(BOOK_DETAIL_MOOK);
    console.log("mook: ", BOOK_DETAIL_MOOK);
    console.log("books signal: ", Object.values( this.books() ));
  }

  fillters(){

  }

  getBooks(): BookDetail[] {
    return Object.values( this.books() );
  }

}
