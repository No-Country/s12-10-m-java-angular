package com.noCountry.library.service.impl;

import com.noCountry.library.dto.Book.*;
import com.noCountry.library.dto.Comment.CommentDto;
import com.noCountry.library.entities.Author;
import com.noCountry.library.entities.Book;
import com.noCountry.library.entities.Editorial;
import com.noCountry.library.entities.enums.Genre;
import com.noCountry.library.entities.enums.Language;
import com.noCountry.library.exception.BadRequestException;
import com.noCountry.library.exception.NotFoundException;
import com.noCountry.library.repository.AuthorRepository;
import com.noCountry.library.repository.BookRepository;
import com.noCountry.library.repository.EditorialRepository;
import com.noCountry.library.repository.specification.BookSpecification;
import com.noCountry.library.service.BookService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

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
    public BookResponse addInformationBook(BookRequest bookRequest) throws BadRequestException {
        Optional<Book> bookAux = bookRepository.findById(bookRequest.getIdBook());
        isEmptyObject(bookAux);

        Optional<Author> author = authorRepository.findById(bookRequest.getIdAuthor());
        isEmptyObject(author);

        Optional<Editorial> editorial = editorialRepository.findById(bookRequest.getIdEditorial());
        isEmptyObject(editorial);

        Genre genre = searchGenre(bookRequest.getGenre());
        Language language = searchLanguage(bookRequest.getLanguage());

        Book book = bookAux.get();

        book.setPrice(bookRequest.getPrice());
        book.setPages(bookRequest.getPages());
        book.setPublicationDate(bookRequest.getPublicationDate());
        book.setQuantityAvailable(bookRequest.getQuantityAvailable());
        book.setDescription(bookRequest.getDescription());

        book.setSalesAmount(0);
        book.setRating(0.0);

        book.setGenre(genre);
        book.setLanguage(language);
        book.setAuthor(author.get());
        book.setEditorial(editorial.get());

        book.setModificationDate(LocalDate.now());
        book.setStatus(Boolean.TRUE);

        if (bookRequest.getCollection() != null) {
            book.setCollection(bookRequest.getCollection());
        }

        if (!bookRequest.getInitialImage().isEmpty()) {
            book.setInitialImage(bookRequest.getInitialImage());
            book.getUrlImages().add(bookRequest.getInitialImage());
        }

        bookRepository.save(book);

        return mapperBooks.bookToBookResponse(book);
    }

    @Transactional
    @Override
    public void createBook(CreateBookRequest book) {
        bookRepository.findById(book.getIdBook()).ifPresent(object -> {
            throw new BadRequestException("El ID del libro ya se encuentra registrado.");
        });

        bookRepository.findByISBN(book.getISBN()).ifPresent(object -> {
            throw new BadRequestException("El ISBN del libro ya se encuentra registrado.");
        });

        Book newBook = new Book();

        newBook.setId(book.getIdBook());
        newBook.setISBN(book.getISBN());
        newBook.setTitle(book.getTitle());

        newBook.setStatus(Boolean.FALSE);
        newBook.setCreationDate(LocalDate.now());
        newBook.setModificationDate(LocalDate.now());

        bookRepository.save(newBook);
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

        if (auxBook.isEmpty()) {
            throw new BadRequestException("El libro a actualizar no se encuentra registardo");
        }
        if (!auxBook.get().getStatus()) {
            throw new BadRequestException("El libro solicitado se encuentra eliminado.");
        }

        Book updatedBook = auxBook.get();
        updatedBook.setModificationDate(LocalDate.now());

        if (book.getIdBook() != null) {
            updatedBook.setISBN(book.getIdBook());
        }

        if (book.getTitle() != null) {
            updatedBook.setTitle(book.getTitle());
        }

        if (book.getPrice() != null) {
            updatedBook.setPrice(book.getPrice());
        }

        if (book.getPages() != null) {
            updatedBook.setPages(book.getPages());
        }

        if (book.getPublicationDate() != null) {
            updatedBook.setPublicationDate(book.getPublicationDate());
        }

        if (book.getDescription() != null) {
            updatedBook.setDescription(book.getDescription());
        }

        if (book.getCollection() != null) {
            updatedBook.setCollection(book.getCollection());
        }

        if (book.getInitialImage() != null) {
            updatedBook.setInitialImage(book.getInitialImage());
        }

        if (book.getGenre() != null) {
            Genre updateGenre = searchGenre(book.getGenre());
            if (updateGenre != null) {
                updatedBook.setGenre(updateGenre);
            }
        }

        if (book.getLanguage() != null) {
            Language updateLanguage = searchLanguage(book.getLanguage());
            if (updateLanguage != null) {
                updatedBook.setLanguage(updateLanguage);
            }
        }

        if (book.getIdAuthor() != null) {
            Optional<Author> author = authorRepository.findById(book.getIdAuthor());
            isEmptyObject(author);

            updatedBook.setAuthor(author.get());
        }

        if (book.getIdEditorial() != null) {
            Optional<Editorial> editorial = editorialRepository.findById(book.getIdEditorial());
            isEmptyObject(editorial);

            updatedBook.setEditorial(editorial.get());
        }

        bookRepository.save(updatedBook);

        return mapperBooks.bookToBookResponse(updatedBook);
    }

    @Override
    public BookResponse getBookById(String id) {
        Optional<Book> auxBook = bookRepository.findById(id);
        isEmptyObject(auxBook);

        if (!auxBook.get().getStatus()) {
            throw new BadRequestException("El libro solicitado se encuentra eliminado.");
        }

        return mapperBooks.bookToBookResponse(auxBook.get());
    }

    @Override
    public PaginatedResponseDTO<BookResponse> getAllBooks(Integer pageNumber, Integer sizeElement) {
        Pageable page = PageRequest.of(pageNumber, sizeElement);
        Page<Book> pagesBook = bookRepository.findAllByStatusTrue(page);

        return pagesBookToPagination(pagesBook, mapperBooks::listBooksToListResponseBooks);
    }

    @Override
    public BookCardResponse getBookForCard(String id) {
        Optional<Book> book = bookRepository.findById(id);
        isEmptyObject(book);

        if (!book.get().getStatus()) {
            throw new BadRequestException("El libro solicitado se encuentra eliminado.");
        }

        return mapperBooks.bookToBookCardResponse(book.get());
    }

    @Override
    public PaginatedResponseDTO<BookCardResponse> getAllBooksForCard(Integer pageNumber, Integer sizeElement) {
        Pageable page = PageRequest.of(pageNumber, sizeElement);
        Page<Book> pagesBook = bookRepository.findAllByStatusTrue(page);

        return pagesBookToPagination(pagesBook, mapperBooks::listBooksToListCardBooks);
    }

    @Override
    public BookCardDescription getBookForCardDescription(String id) {
        Optional<Book> book = bookRepository.findById(id);
        isEmptyObject(book);

        if (!book.get().getStatus()) {
            throw new BadRequestException("El libro solicitado se encuentra eliminado.");
        }

        return mapperBooks.bookToBookCardDescription(book.get());
    }

    @Override
    public PaginatedResponseDTO<BookCardDescription> getAllBooksForCardDescription(Integer pageNumber, Integer sizeElement) {
        Pageable page = PageRequest.of(pageNumber, sizeElement);
        Page<Book> pagesBook = bookRepository.findAllByStatusTrue(page);

        return pagesBookToPagination(pagesBook, mapperBooks::listBookToListBookCardDescription);
    }

    @Override
    public PaginatedResponseDTO<BookToSearch> getBooksByCriteria(Integer pageNumber, Integer sizeElement,
                                                                 Double minPrice, Double maxPrice, Integer minPages,
                                                                 List<String> genres, List<String> languages, String searchText,
                                                                 Integer searchEvenNotAvailable, String orderBy, String ascOrDesc) {
        List<Genre> genreList = searchListGenres(genres);
        List<Language> languageList = searchListLanguage(languages);

        Specification<Book> spec = BookSpecification.filterByCriteria(minPrice, maxPrice, minPages,
                genreList, languageList, searchText, searchEvenNotAvailable);

        Sort sort = getSortFromOrderBy(orderBy, ascOrDesc);
        Pageable pageable = PageRequest.of(pageNumber, sizeElement, sort);
        Page<Book> page = bookRepository.findAll(spec, pageable);

        return pagesBookToPagination(page, mapperBooks::listBookToListBookToSearch);
    }

    @Override
    public PaginatedResponseDTO<BookToSearch> searchByText(String searchText, Integer pageNumber, Integer sizeElement,
                                                            String orderBy, String ascOrDesc) {

        Specification<Book> spec = BookSpecification.filterByText(searchText);
        Sort sort = getSortFromOrderBy(orderBy, ascOrDesc);

        Pageable pageable = PageRequest.of(pageNumber, sizeElement, sort);
        Page<Book> page = bookRepository.findAll(spec, pageable);

        return pagesBookToPagination(page, mapperBooks::listBookToListBookToSearch);
    }


    @Transactional
    @Override
    public void addImagesBook(String id, UrlImage image) {
        Optional<Book> auxBook = bookRepository.findById(id);
        isEmptyObject(auxBook);

        Book book = auxBook.get();

        if (book.getUrlImages() == null) {
            book.setUrlImages(new ArrayList<>());
        }

        if (image.getImage() == null || image.getImage().isEmpty()) {
            throw new BadRequestException("La imagen a almacenar esta vacia");
        }

        if (image.getIsBookCover()) {
            book.setInitialImage(image.getImage());
        }

        book.getUrlImages().add(image.getImage());
        book.setModificationDate(LocalDate.now());

        bookRepository.save(book);
    }

    @Transactional
    @Override
    public BookResponse addQuantityAvailable(String id, Integer amount) {
        Optional<Book> auxBook = bookRepository.findById(id);
        isEmptyObject(auxBook);

        Book book = auxBook.get();

        if (!book.getStatus()) {
            throw new BadRequestException("El libro solicitado se encuentra eliminado.");
        }

        if (amount < 1) {
            throw new BadRequestException("La cantidad a agregar no puede ser menor a 1.");
        }

        int quantity = book.getQuantityAvailable() + amount;
        book.setQuantityAvailable(quantity);
        book.setModificationDate(LocalDate.now());

        bookRepository.save(book);

        return mapperBooks.bookToBookResponse(book);
    }

    @Override
    public BookResponse subtractAmount(String id, Integer amount) throws BadRequestException {
        Optional<Book> auxBook = bookRepository.findById(id);
        isEmptyObject(auxBook);

        Book book = auxBook.get();

        if (!book.getStatus()) {
            throw new BadRequestException("El libro solicitado se encuentra eliminado.");
        }

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

    @Transactional
    @Override
    public BookResponse addVote(String id, Integer vote) {

        if (vote <= 0 || vote > 5) {
            throw new BadRequestException("El voto no puede ser menor a 1 ni mayor a 5.");
        }

        Optional<Book> auxBook = bookRepository.findById(id);
        isEmptyObject(auxBook);

        Book book = auxBook.get();

        if (!book.getStatus()) {
            throw new BadRequestException("El libro solicitado se encuentra eliminado.");
        }

        bookRepository.asignarRatingABook(id, Double.valueOf(vote));

        book.getVoteList().add(vote);
        book.setRating(averageCalculation(book.getVoteList()));
        book.setModificationDate(LocalDate.now());

        bookRepository.save(book);

        System.out.println("El voto fue: " + vote);
        System.out.println("El promedio es: " + book.getRating());

        return mapperBooks.bookToBookResponse(book);
    }

    @Override
    public BookResponse addComment(CommentDto comments) {
        return null;
    }




    @Override
    public PaginatedResponseDTO<BookToSearch> searchByGenre(String genre, Integer pageNumber, Integer sizeElement) {
        Genre genreElement = searchGenre(genre);

        if (genreElement == null) {
            throw new BadRequestException("El genero ingresado no existe.");
        }

        Pageable page = PageRequest.of(pageNumber, sizeElement);
        Page<Book> pagesBook = bookRepository.findByGenreAndStatusTrue(genreElement, page);

        if (pagesBook.isEmpty()) {
            throw new BadRequestException("No se encontraron libros del genero " + genre);
        }

        return pagesBookToPagination(pagesBook, mapperBooks::listBookToListBookToSearch);
    }

    @Override
    public PaginatedResponseDTO<BookToSearch> searchByTitle(String title, Integer pageNumber, Integer sizeElement) {
        Pageable page = PageRequest.of(pageNumber, sizeElement);
        Page<Book> pagesBook = bookRepository.findByTitleContainingAndStatusTrue(title, page);

        if (pagesBook.isEmpty()) {
            throw new BadRequestException("No se encontraron libros con el texto ingresado ");
        }

        return pagesBookToPagination(pagesBook, mapperBooks::listBookToListBookToSearch);
    }

    @Override
    public PaginatedResponseDTO<BookToSearch> searchLatestAdded(Integer pageNumber, Integer sizeElement) {
        Pageable page = PageRequest.of(pageNumber, sizeElement);
        Page<Book> pagesBook = bookRepository.findAllByStatusTrueOrderByCreationDateDesc(page);

        return pagesBookToPagination(pagesBook, mapperBooks::listBookToListBookToSearch);
    }

    @Override
    public PaginatedResponseDTO<BookToSearch> searchByHighestRating(Integer pageNumber, Integer sizeElement) {

        // By trending
        Pageable page = PageRequest.of(pageNumber, sizeElement);
        Page<Book> pagesBook = bookRepository.findAllByStatusTrueOrderBySalesAmountDesc(page);

        return pagesBookToPagination(pagesBook, mapperBooks::listBookToListBookToSearch);
    }

    @Override
    public PaginatedResponseDTO<CommentDto> getCommentsByBookId(String bookId, Integer pageNumber, Integer sizeElement) {
        return null;
    }





    private Genre searchGenre(String genre) {
        String formattedGenre = genre.replaceAll(" ", "_");

        for (Genre element : Genre.values()) {
            if (element.name().equalsIgnoreCase(formattedGenre)) {
                return element;
            }
        }
        return null;
    }

    private List<Genre> searchListGenres(List<String> genres) {
        List<Genre> genreList = new ArrayList<>();

        if (genres != null && !genres.isEmpty()) {
            for (String genreName : genres) {
                Genre genre = searchGenre(genreName);
                if (genre != null) {
                    genreList.add(genre);
                }
            }
        }

        return genreList;
    }

    private Language searchLanguage(String language) {
        for (Language element : Language.values()) {
            if (element.name().equalsIgnoreCase(language)) {
                return element;
            }
        }
        return null;
    }

    private List<Language> searchListLanguage(List<String> languages) {
        List<Language> languageList = new ArrayList<>();

        if (languages != null) {
            for (String element: languages) {
                Language language = searchLanguage(element);
                if (language != null) {
                    languageList.add(language);
                }
            }
        }

        return languageList;
    }

    private void isEmptyObject(Optional<?> object) throws NotFoundException {
        if (object.isEmpty()) {
            throw new NotFoundException("No se encontró el objeto buscado.");
        }
    }


    private <T> PaginatedResponseDTO<T> pagesBookToPagination(Page<Book> pagesBook, Function<List<Book>, List<T>> mapper) {
        PaginatedResponseDTO<T> bookResponseDTO = new PaginatedResponseDTO<>();

        List<Book> bookList = pagesBook.getContent();

        bookResponseDTO.setContent(mapper.apply(bookList));
        bookResponseDTO.setTotalPages(pagesBook.getTotalPages());
        bookResponseDTO.setTotalElements(pagesBook.getTotalElements());
        bookResponseDTO.setIsLast(pagesBook.isLast());

        return bookResponseDTO;
    }

    private Sort getSortFromOrderBy(String orderBy, String ascOrDesc) {
        if (orderBy == null) {
            return Sort.unsorted();
        }

        Sort.Order primaryOrder;

        primaryOrder = switch (orderBy) {
            case "alphabetically" -> Sort.Order.by("title");
            case "publicationDate" -> Sort.Order.by("publicationDate");
            case "salesAmount" -> Sort.Order.by("salesAmount");
            case "rating" -> Sort.Order.by("rating");
            case "price" -> Sort.Order.by("price");
            default -> throw new IllegalArgumentException("OrderBy no es un parametro valido: " + orderBy);
        };

        if ("DESC".equalsIgnoreCase(ascOrDesc)) {
            return Sort.by(primaryOrder).descending();
        } else {
            return Sort.by(primaryOrder).ascending();
        }
    }

    private Double averageCalculation(List<Integer> voteList) {
        if (voteList.isEmpty()) {
            throw new BadRequestException("No hay votos cargados en el libro.");
        }

        double addition = 0;
        for (Integer number : voteList) {
            addition += number;
        }

        return (addition / voteList.size());
    }


}
