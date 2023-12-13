package com.noCountry.library.dto.Book;

import com.noCountry.library.entities.Book;
import com.noCountry.library.entities.enums.Genre;
import org.springframework.stereotype.Component;

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

        book.setPublicationDate(bookRequest.getPublicationDate());
        book.setQuantityAvailable(bookRequest.getQuantityAvailable());
        book.setDescription(bookRequest.getDescription());
        book.setCollection(bookRequest.getCollection());
        book.setInitialImage(bookRequest.getInitialImage());

        return book;
    }

    public BookResponse bookToBookResponse(Book book) {
        String author = book.getAuthor().getFullName();

        BookResponse bookResponse = new BookResponse();

        bookResponse.setIdBook(book.getId());
        bookResponse.setISBN(book.getISBN());
        bookResponse.setTitle(book.getTitle());
        bookResponse.setPrice(book.getPrice());
        bookResponse.setPages(book.getPages());

        bookResponse.setPublicationDate(book.getPublicationDate());
        bookResponse.setQuantityAvailable(book.getQuantityAvailable());
        bookResponse.setSalesAmount(book.getSalesAmount());
        bookResponse.setRating(book.getRating());

        bookResponse.setDescription(book.getDescription());
        bookResponse.setCollection(book.getCollection());

        bookResponse.setGenre(book.getGenre().name());

        if (book.getLanguage() != null) {
            bookResponse.setLanguage(book.getLanguage().name());
        }

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
        String author = book.getAuthor().getFullName();

        BookCardResponse bookResponse = new BookCardResponse();

        bookResponse.setTitle(book.getTitle());
        bookResponse.setPrice(book.getPrice());
        bookResponse.setAuthor(author);
        bookResponse.setInitialImage(book.getInitialImage());

        return bookResponse;
    }

    public List<BookCardResponse> listBooksToListCardBooks(List<Book> listBooks) {
        List<BookCardResponse> listCardBook = new ArrayList<>();

        for (Book book: listBooks) {
            listCardBook.add(bookToBookCardResponse(book));
        }

        return listCardBook;
    }

    public BookCardDescription bookToBookCardDescription(Book book) {
        String author = book.getAuthor().getFullName();

        BookCardDescription bookResponse = new BookCardDescription();

        bookResponse.setTitle(book.getTitle());
        bookResponse.setPrice(book.getPrice());
        bookResponse.setAuthor(author);
        bookResponse.setInitialImage(book.getInitialImage());
        bookResponse.setDescription(book.getDescription());

        return bookResponse;
    }

    public List<BookCardDescription> listBookToListBookCardDescription(List<Book> listBooks) {
        List<BookCardDescription> listBookDto = new ArrayList<>();

        for (Book book: listBooks) {
            listBookDto.add(bookToBookCardDescription(book));
        }

        return listBookDto;
    }

    public BookToSearch bookToBookToSearch(Book book) {
        BookToSearch bookDetails = new BookToSearch();
        String author = book.getAuthor().getFullName();

        bookDetails.setID(book.getId());
        bookDetails.setName(book.getTitle());
        bookDetails.setAuthor(author);
        bookDetails.setImage(book.getInitialImage());
        bookDetails.setPrice(book.getPrice());
        bookDetails.setDescription(book.getDescription());

        return bookDetails;
    }

    public List<BookToSearch> listBookToListBookToSearch(List<Book> books) {
        List<BookToSearch> listResponse = new ArrayList<>();

        for (Book book: books) {
            listResponse.add(bookToBookToSearch(book));
        }

        return listResponse;
    }

}
