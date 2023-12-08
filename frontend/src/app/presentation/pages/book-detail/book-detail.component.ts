import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailCardComponent } from '@presentation/components/book-detail-card/book-detail-card.component';
import { Navbar2Component } from '@presentation/components/navbar-2/navbar-2.component';
import { NavbarComponent } from '@presentation/components/navbar/navbar.component';
import { FooterComponent } from '@presentation/components/footer/footer.component';
import { BooksService } from 'app/data/services/books/books.service';
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
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  public book: Book;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {
    this.book = {} as Book;
  }

  ngOnInit() {
    // Obtén el id del libro de los parámetros de la ruta
    const bookId = this.route.snapshot.paramMap.get('id');

    // Verifica si se proporcionó un id y es un número
    if (bookId && !isNaN(Number(bookId))) {
      // Llama al servicio para obtener los detalles del libro
      this.booksService.detail(Number(bookId)).subscribe({ next:

        (details) => {
          // Actualiza los detalles del libro en el componente
          this.book = details;
          console.log(this.book)
        },
        error:(error) => {
          console.error('Error obteniendo detalles del libro', error);
        }}
      );
    } else {
      console.error('ID del libro no válido');
    }
  }
}