package com.noCountry.library.dto.Book;

import com.noCountry.library.entities.Book;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class MapperBooks {

    public Book bookRequestToBook(BookRequest bookRequest) {
        Book book = new Book();

        book.setId(bookRequest.getIdBook());
        book.setISBN(bookRequest.getISBN());
        book.setTitle(bookRequest.getTitle());
        book.setPrice(bookRequest.getPrice());
        book.setPages(bookRequest.getPages());
        book.setQuantity(bookRequest.getQuantity());
        book.setDescription(bookRequest.getDescription());
        book.setUrlImages(bookRequest.getUrlImages());

        return book;
    }

    public BookResponse bookToBookResponse(Book book) {
        String author = book.getAuthor().getName() + book.getAuthor().getLastName();

        BookResponse bookResponse = new BookResponse();

        bookResponse.setIdBook(book.getId());
        bookResponse.setISBN(book.getISBN());
        bookResponse.setTitle(book.getTitle());
        bookResponse.setPrice(book.getPrice());
        bookResponse.setPages(book.getPages());
        bookResponse.setQuantity(book.getQuantity());
        bookResponse.setDescription(book.getDescription());
        bookResponse.setGenre(book.getGenre().name());
        bookResponse.setCompleteNameAuthor(author);
        bookResponse.setNameEditorial(book.getEditorial().getName());
        bookResponse.setUrlImages(book.getUrlImages());

        return bookResponse;
    }

    public List<BookResponse> listBooksToListResponseBooks(List<Book> listBooks) {

        List<BookResponse> listResponse = new ArrayList<>();

        for (Book book: listBooks) {
            listResponse.add(bookToBookResponse(book));
        }

        return listResponse;
    }


    public BookCardResponse bookToBookCardResponse(Book book) {
        String author = book.getAuthor().getName() + book.getAuthor().getLastName();

        BookCardResponse bookResponse = new BookCardResponse();

        bookResponse.setTitle(book.getTitle());
        bookResponse.setPrice(book.getPrice());
        bookResponse.setAuthor(author);
        bookResponse.setUrlImages(book.getUrlImages());

        return bookResponse;
    }

    public List<BookCardResponse> listBooksToListCardBooks(List<Book> listBooks) {
        List<BookCardResponse> listCardBook = new ArrayList<>();

        for (Book book: listBooks) {
            listCardBook.add(bookToBookCardResponse(book));
        }

        return listCardBook;
    }


}
