package com.noCountry.library.service.impl;

import com.noCountry.library.dto.Book.*;
import com.noCountry.library.entities.Author;
import com.noCountry.library.entities.Book;
import com.noCountry.library.entities.Editorial;
import com.noCountry.library.entities.enums.Genre;
import com.noCountry.library.exception.BadRequestException;
import com.noCountry.library.exception.NotFoundException;
import com.noCountry.library.repository.AuthorRepository;
import com.noCountry.library.repository.BookRepository;
import com.noCountry.library.repository.EditorialRepository;
import com.noCountry.library.service.BookService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
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
            throw new BadRequestException("El libro ingresado ya se encuentra registrado.");
        });

        Optional<Author> author = authorRepository.findById(bookRequest.getIdAuthor());
        isEmptyObject(author);

        Optional<Editorial> editorial = editorialRepository.findById(bookRequest.getIdEditorial());
        isEmptyObject(editorial);

        Genre genre = searchGenre(bookRequest.getGenre());

        Book book = mapperBooks.bookRequestToBook(bookRequest);

        book.setSalesAmount(0);
        book.setRating(0);

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
    public PaginatedBookResponseDTO<BookResponse> getAllBooks(Integer pageNumber, Integer sizeElement) {
        Pageable page = PageRequest.of(pageNumber, sizeElement);
        Page<Book> pagesBook = bookRepository.findAll(page);

        return pagesBookToPagesDto(pagesBook);
    }

    @Override
    public BookCardResponse getBookForCard(String id) {
        Optional<Book> book = bookRepository.findById(id);
        isEmptyObject(book);

        return mapperBooks.bookToBookCardResponse(book.get());
    }

    @Override
    public PaginatedBookResponseDTO<BookCardResponse> getAllBooksForCard(Integer pageNumber, Integer sizeElement) {
        Pageable page = PageRequest.of(pageNumber, sizeElement);
        Page<Book> pagesBook = bookRepository.findAll(page);

        return pagesBookToPaginationCard(pagesBook);
    }

    @Transactional
    @Override
    public void addImagesBook(String id, String img) {
        Optional<Book> auxBook = bookRepository.findById(id);
        isEmptyObject(auxBook);

        Book book = auxBook.get();

        if (book.getUrlImages() == null) {
            book.setUrlImages(new ArrayList<>());
        }

        if (img == null || img.isEmpty()) {
            throw new BadRequestException("La imagen a almacenar esta vacia");
        }

        book.getUrlImages().add(img);
        book.setModificationDate(LocalDate.now());

        bookRepository.save(book);
    }

    @Transactional
    @Override
    public BookResponse addQuantityAvailable(String id, Integer amount) {
        Optional<Book> auxBook = bookRepository.findById(id);
        isEmptyObject(auxBook);

        Book book = auxBook.get();

        if (amount < 0) {
            throw  new BadRequestException("La cantidad a agregar no puede ser 0 ni negativa.");
        }

        int quantity = book.getQuantityAvailable() + amount;
        book.setQuantityAvailable(quantity);
        book.setModificationDate(LocalDate.now());

        bookRepository.save(book);

        return mapperBooks.bookToBookResponse(book);
    }

    @Transactional
    @Override
    public BookResponse subtractAmount(String id, Integer amount) {
        Optional<Book> auxBook = bookRepository.findById(id);
        isEmptyObject(auxBook);

        Book book = auxBook.get();

        if (book.getQuantityAvailable() < amount) {
            throw new BadRequestException("No hay stock sufienciente.");
        }

        if (book.getSalesAmount() == null) {
            book.setSalesAmount(0);
        }

        int salesAmount = book.getSalesAmount() + amount;
        int quantityAvailable = book.getQuantityAvailable() - amount;

        book.setSalesAmount(salesAmount);
        book.setQuantityAvailable(quantityAvailable);
        book.setModificationDate(LocalDate.now());

        bookRepository.save(book);

        return mapperBooks.bookToBookResponse(book);
    }

    @Override
    public BookResponse addVote(String id, Integer vote) {

        if (vote <= 0 || vote > 5) {
            throw new BadRequestException("El voto no puede ser menor a 1 ni amyor a 5.");
        }

        Optional<Book> auxBook = bookRepository.findById(id);
        isEmptyObject(auxBook);

        Book book = auxBook.get();

        /*
        Consultar cual de las 2 formas vistas para almacenar un rating
        consideran mejor para que se implemente..
        1) nuevos atributos
        1) nueva clase
         */

        return mapperBooks.bookToBookResponse(book);
    }


    @Override
    public PaginatedBookResponseDTO<BookResponse> searchByGenre(String genre, Integer pageNumber, Integer sizeElement) {
        Genre genreElement = searchGenre(genre);

        if (genreElement == null ) {
            throw new BadRequestException("El genero ingresado no existe.");
        }

        Pageable page = PageRequest.of(pageNumber, sizeElement);
        Page<Book> pagesBook = bookRepository.findByGenre(genreElement, page);

        if (pagesBook.isEmpty()) {
            throw new BadRequestException("No se encontraron libros del genero " + genre);
        }

        return pagesBookToPagesDto(pagesBook);
    }

    @Override
    public List<BookResponse> searchByTrend() {
        // Devuelve los 5 libros mas vendidos
        Optional<List<Book>> auxBook = bookRepository.findTop5ByOrderBySalesAmountAsc();

        return mapperBooks.listBooksToListResponseBooks(auxBook.get());
    }

    @Override
    public List<BookResponse> searchByHighestRating() {
        Optional<List<Book>> auxBook = bookRepository.findTop5ByOrderByRatingAsc();

        return mapperBooks.listBooksToListResponseBooks(auxBook.get());
    }


    @Override
    public List<BookResponse> searchByTitle(String title) {
        Optional<List<Book>> auxBook = bookRepository.findByTitleContaining(title);

        return mapperBooks.listBooksToListResponseBooks(auxBook.get());
    }

    @Override
    public List<BookResponse> searchLastAdditions() {
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


    private PaginatedBookResponseDTO<BookResponse> pagesBookToPagesDto(Page<Book> pagesBook) {
        PaginatedBookResponseDTO<BookResponse> bookResponseDTO = new PaginatedBookResponseDTO<>();

        List<Book> bookList = pagesBook.getContent();

        bookResponseDTO.setContent(mapperBooks.listBooksToListResponseBooks(bookList));
        bookResponseDTO.setTotalPages(pagesBook.getTotalPages());
        bookResponseDTO.setTotalElements(pagesBook.getTotalElements());

        return bookResponseDTO;
    }

    private PaginatedBookResponseDTO<BookCardResponse> pagesBookToPaginationCard(Page<Book> pagesBook) {
        PaginatedBookResponseDTO<BookCardResponse> bookCardResponseDTO = new PaginatedBookResponseDTO<>();

        List<Book> bookList = pagesBook.getContent();

        bookCardResponseDTO.setContent(mapperBooks.listBooksToListCardBooks(bookList));
        bookCardResponseDTO.setTotalPages(pagesBook.getTotalPages());
        bookCardResponseDTO.setTotalElements(pagesBook.getTotalElements());

        return bookCardResponseDTO;
    }

}
