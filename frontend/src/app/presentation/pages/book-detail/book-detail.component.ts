import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailCardComponent } from '@presentation/components/book-detail-card/book-detail-card.component';
import { Navbar2Component } from '@presentation/components/navbar-2/navbar-2.component';
import { NavbarComponent } from '@presentation/components/navbar/navbar.component';
import { FooterComponent } from '@presentation/components/footer/footer.component';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, BookDetailCardComponent, 
    FooterComponent,
    NavbarComponent,
    Navbar2Component],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent {

}
