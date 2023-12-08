import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailCardComponent } from '@presentation/components/book-detail-card/book-detail-card.component';
import { Navbar2Component } from '@presentation/components/navbar-2/navbar-2.component';
import { NavbarComponent } from '@presentation/components/navbar/navbar.component';
import { FooterComponent } from '@presentation/components/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'app/data/models/book';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, BookDetailCardComponent,
    FooterComponent,
    NavbarComponent,
    Navbar2Component],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailComponent implements OnInit {
  public book: Book;

  constructor(
    private route: ActivatedRoute
  ) {
    this.book = {} as Book;
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.book = data['book'];
    });
  }

}
