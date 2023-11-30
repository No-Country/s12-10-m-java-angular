package com.noCountry.library.service.impl;

import com.noCountry.library.dto.Book.BookCardResponse;
import com.noCountry.library.dto.Book.BookRequest;
import com.noCountry.library.dto.Book.BookResponse;
import com.noCountry.library.dto.Book.MapperBooks;
import com.noCountry.library.entities.Author;
import com.noCountry.library.entities.Book;
import com.noCountry.library.entities.Editorial;
import com.noCountry.library.entities.enums.Genre;
import com.noCountry.library.exception.NotFoundException;
import com.noCountry.library.repository.AuthorRepository;
import com.noCountry.library.repository.BookRepository;
import com.noCountry.library.repository.EditorialRepository;
import com.noCountry.library.service.BookService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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

    @Transactional
    @Override
    public BookResponse createdBook(BookRequest bookRequest) throws Exception {
        bookRepository.findById(bookRequest.getIdBook()).ifPresent(object -> {
            //throw new Exception();
        });


        Optional<Author> author = authorRepository.findById(bookRequest.getIdAuthor());
        isEmptyObject(author);

        Optional<Editorial> editorial = editorialRepository.findById(bookRequest.getIdEditorial());
        isEmptyObject(editorial);

        Genre genre = searchGenre(bookRequest.getGenre());

        Book book = mapperBooks.bookRequestToBook(bookRequest);

        book.setStatus(true);
        book.setCreationDate(LocalDate.now());
        book.setModificationDate(LocalDate.now());

        book.setAuthor(author.get());
        book.setEditorial(editorial.get());
        book.setGenre(genre);

        bookRepository.save(book);

        return mapperBooks.bookToBookResponse(book);
    }

    @Transactional
    @Override
    public void deleteBook(String id) {
        Optional<Book> book = bookRepository.findById(id);
        isEmptyObject(book);

        Book deletedBook = book.get();
        deletedBook.setStatus(false);
        deletedBook.setModificationDate(LocalDate.now());

        bookRepository.save(deletedBook);
    }

    @Transactional
    @Override
    public BookResponse updateBook(BookRequest book) {
        Optional<Book> auxBook = bookRepository.findById(book.getIdBook());
        isEmptyObject(auxBook);

        Book updatedBook = auxBook.get();
        updatedBook.setModificationDate(LocalDate.now());
        // demas sets
        // ver que atributos vamos a querer modificar del libro y cuales no



        bookRepository.save(updatedBook);

        return mapperBooks.bookToBookResponse(updatedBook);
    }

    @Override
    public BookResponse getBookById(String id) {
        Optional<Book> auxBook = bookRepository.findById(id);
        isEmptyObject(auxBook);

        Book book = auxBook.get();

        return mapperBooks.bookToBookResponse(book);
    }

    @Override
    public List<BookResponse> getAllBooks() {
        List<Book> books = bookRepository.findAll();

        return mapperBooks.listBooksToListResponseBooks(books);
    }

    @Override
    public BookCardResponse getBookForCard(String id) {
        Optional<Book> book = bookRepository.findById(id);
        isEmptyObject(book);

        return mapperBooks.bookToBookCardResponse(book.get());
    }

    @Override
    public List<BookCardResponse> getAllBooksForCard() {
        List<Book> books = bookRepository.findAll();

        return mapperBooks.listBooksToListCardBooks(books);
    }

    @Transactional
    @Override
    public void addImagesBook(String id, String img) {
        Optional<Book> auxBook = bookRepository.findById(id);
        isEmptyObject(auxBook);

        Book book = auxBook.get();

        if (img != null) {
            book.getUrlImages().add(img);
            book.setModificationDate(LocalDate.now());
        }

        bookRepository.save(book);
    }

    @Override
    public void addQuantityAvailable(String id, Integer amount) {

    }

    @Override
    public void subtractAmount(String id, Integer amount) {

    }




    @Override
    public List<BookResponse> searchByCategory(String category) {
        return null;
    }

    @Override
    public List<BookResponse> searchByTrend() {
        return null;
    }

    @Override
    public List<BookResponse> searchByRating(Integer searchedRating) {
        return null;
    }

    @Override
    public List<BookResponse> searchByAuthor(String idAuthor) {
        return null;
    }

    @Override
    public List<BookResponse> searchByEditorial(String idEditorial) {
        return null;
    }

    private Genre searchGenre(String genre) {

        for (Genre element: Genre.values()) {
            if (element.name().equals(genre)) {
                return element;
            }
        }
        return null;
    }


    private void isEmptyObject(Optional<?> object) throws NotFoundException {
        if (object.isEmpty()){
            throw new NotFoundException("Could not found " + object.getClass());
        }
    }



}
