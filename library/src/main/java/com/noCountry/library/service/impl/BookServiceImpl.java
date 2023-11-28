package com.noCountry.library.service.impl;

import com.noCountry.library.dto.Book.BookCardResponse;
import com.noCountry.library.dto.Book.BookRequest;
import com.noCountry.library.dto.Book.BookResponse;
import com.noCountry.library.dto.Book.MapperBooks;
import com.noCountry.library.entities.Author;
import com.noCountry.library.entities.Book;
import com.noCountry.library.entities.Editorial;
import com.noCountry.library.entities.enums.Genre;
import com.noCountry.library.repository.AuthorRepository;
import com.noCountry.library.repository.BookRepository;
import com.noCountry.library.repository.EditorialRepository;
import com.noCountry.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    private final AuthorRepository authorRepository;

    private final EditorialRepository editorialRepository;

    private final MapperBooks mapperBooks;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, MapperBooks mapperBooks,
                           AuthorRepository authorRepository, EditorialRepository editorialRepository) {
        this.bookRepository = bookRepository;
        this.mapperBooks = mapperBooks;
        this.authorRepository = authorRepository;
        this.editorialRepository = editorialRepository;
    }

    @Override
    public BookResponse createdBook(BookRequest bookRequest) {

        Author author = authorRepository.findById(bookRequest.getIdAuthor()).get();
        Editorial editorial = editorialRepository.findById(bookRequest.getIdEditorial()).get();
        Genre genre = searchGenre(bookRequest.getGenre());

        Book book = mapperBooks.bookRequestToBook(bookRequest);
        book.setAuthor(author);
        book.setEditorial(editorial);
        book.setGenre(genre);

        bookRepository.save(book);

        return mapperBooks.bookToBookResponse(book);
    }

    @Override
    public void deleteBook(String id) {
        Book deletedBook = bookRepository.findById(id).get();

        if (deletedBook != null) {
            deletedBook.setStatus(false);
            deletedBook.setModificationDate(LocalDate.now());
        }

        bookRepository.save(deletedBook);
    }

    @Override
    public BookResponse updateBook(BookRequest book) {
        return null;
    }

    @Override
    public BookResponse getBookById(String id) {

        Book book = bookRepository.findById(id).get();

        return mapperBooks.bookToBookResponse(book);
    }

    @Override
    public BookCardResponse getBookForCard(String id) {
        Book book = bookRepository.findById(id).get();
        BookCardResponse bookResponse = new BookCardResponse();

        if (book != null) {
            bookResponse = mapperBooks.bookToBookCardResponse(book);
        }

        return bookResponse;
    }

    @Override
    public void addImagesBook(String id, String img) {





    }

    public Genre searchGenre(String genre) {

        for (Genre element: Genre.values()) {
            if (element.name().equals(genre)) {
                return element;
            }
        }

        return null;
    }


}
