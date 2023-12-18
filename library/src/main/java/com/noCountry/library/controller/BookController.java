package com.noCountry.library.controller;

import com.noCountry.library.dto.Book.*;
import com.noCountry.library.dto.Comment.CommentDto;
import com.noCountry.library.exception.BadRequestException;
import org.springframework.web.bind.annotation.RestController;

import com.noCountry.library.service.impl.BookServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/book")
public class BookController {

    private final BookServiceImpl bookService;

    @Autowired
    public BookController(BookServiceImpl bookService) {
        this.bookService = bookService;
    }


    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getBookById(@PathVariable String id) {
        try {
            BookResponse book = bookService.getBookById(id);
            return new ResponseEntity<>(book, HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/allBooks")
    public ResponseEntity<?> getAllBooks(@RequestParam(defaultValue = "0") int page,
                                         @RequestParam(defaultValue = "5") int size) {
        try {
            PaginatedResponseDTO<BookResponse> books = bookService.getAllBooks(page, size);
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/toCard/{id}")
    public ResponseEntity<?> getBookByIdToCard(@PathVariable String id) {
        try {
            BookCardResponse book = bookService.getBookForCard(id);
            return new ResponseEntity<>(book, HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/toCard/allBooks")
    public ResponseEntity<?> getAllBooksToCard(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "5") int size) {
        try {
            PaginatedResponseDTO<BookCardResponse> books = bookService.getAllBooksForCard(page, size);
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/toCardDescription/{id}")
    public ResponseEntity<?> getBookByIdToCardDescription(@PathVariable String id) {
        try {
            BookCardDescription book = bookService.getBookForCardDescription(id);
            return new ResponseEntity<>(book, HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/toCardDescription/allBooks")
    public ResponseEntity<?> getAllBooksToCardDescription(@RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "5") int size) {
        try {
            PaginatedResponseDTO<BookCardDescription> books =
                    bookService.getAllBooksForCardDescription(page, size);
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/searchByCriteria")
    public ResponseEntity<?> getBooksByCriteria(@RequestParam(defaultValue = "0") Integer page,
                                                @RequestParam(defaultValue = "5") Integer size,
                                                @RequestParam(required = false) Double minPrice,
                                                @RequestParam(required = false) Double maxPrice,
                                                @RequestParam(required = false) Integer minPages,
                                                @RequestParam(required = false) List<String> genre,
                                                @RequestParam(required = false) List<String> language,
                                                @RequestParam(required = false) String searchText,
                                                @RequestParam(required = false) Integer searchEvenNotAvailable,
                                                @RequestParam(required = false) String orderBy,
                                                @RequestParam(required = false) String ascOrDesc) {
        try {
            PaginatedResponseDTO<BookToSearch> books =
                    bookService.getBooksByCriteria(page, size,minPrice, maxPrice, minPages,
                                                genre, language, searchText, searchEvenNotAvailable,
                                                orderBy, ascOrDesc);
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/searchText/{text}")
    public ResponseEntity<?> getBookByText(@PathVariable String text,
                                           @RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "5") int size,
                                           @RequestParam(required = false) String orderBy,
                                           @RequestParam(required = false) String ascOrDesc) {
        try {
            PaginatedResponseDTO<BookToSearch> book = bookService.searchByText(text, page, size, orderBy, ascOrDesc);
            return new ResponseEntity<>(book, HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }


    @GetMapping(path = "/searchGenre/{genre}")
    public ResponseEntity<?> getBookByGenre(@PathVariable String genre,
                                            @RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "5") int size) {
        try {
            PaginatedResponseDTO<BookToSearch> book = bookService.searchByGenre(genre, page, size);
            return new ResponseEntity<>(book, HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/searchTitle/{title}")
    public ResponseEntity<?> getBookByTitle(@PathVariable String title,
                                            @RequestParam(defaultValue = "0") int page,
                                            @RequestParam(defaultValue = "5") int size) {
        try {
            PaginatedResponseDTO<BookToSearch> book = bookService.searchByTitle(title, page, size);
            return new ResponseEntity<>(book, HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/searchLatestAdded")
    public ResponseEntity<?> getBookLatestAdded(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "5") int size) throws Exception {
        try {
            PaginatedResponseDTO<BookToSearch> book = bookService.searchLatestAdded(page, size);
            return new ResponseEntity<>(book, HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/searchHighestRating")
    public ResponseEntity<?> searchByHighestRating(@RequestParam(defaultValue = "0") int page,
                                                   @RequestParam(defaultValue = "5") int size) {
        try {
            PaginatedResponseDTO<BookToSearch> book = bookService.searchByHighestRating(page, size);
            return new ResponseEntity<>(book, HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @GetMapping(path = "/getComments/{bookId}")
    public ResponseEntity<?> addComment(@PathVariable String bookId,
                                        @RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "5") int size) {
        try {
            PaginatedResponseDTO<CommentDto> bookComments = bookService.getCommentsByBookId(bookId, page, size);
            return new ResponseEntity<>(bookComments, HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }


    @PostMapping(path = "/createBook")
    public ResponseEntity<?> createBook(@RequestBody @Valid CreateBookRequest bookRequest) {
        try {
            bookService.createBook(bookRequest);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @PostMapping(path = "/addInfoBook")
    public ResponseEntity<?> addInformationBook(@RequestBody @Valid BookRequest bookRequest) {
        try {
            BookResponse bookResponse = bookService.addInformationBook(bookRequest);
            return new ResponseEntity<>(bookResponse, HttpStatus.CREATED);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }


    @PostMapping(path = "/addImage/{id}")
    public ResponseEntity<?> addImageAtBook(@RequestBody @Valid UrlImage image, @PathVariable String id) {
        try {
            bookService.addImagesBook(id, image);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    // Endpoint temporal hasta q este la clase ventas
    @PostMapping(path = "/{id}/quatityAvaible/{amount}")
    public ResponseEntity<?> addQuantityAvailable(@PathVariable String id, @PathVariable Integer amount) {
        try {
            BookResponse book = bookService.addQuantityAvailable(id, amount);
            return new ResponseEntity<>(book, HttpStatus.CREATED);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    // Endpoint temporal hasta q este la clase ventas
    @PostMapping(path = "/{id}/subtractAmount/{amount}")
    public ResponseEntity<?> subtractAmount(@PathVariable String id, @PathVariable Integer amount) {
        try {
            BookResponse book = bookService.subtractAmount(id, amount);
            return new ResponseEntity<>(book, HttpStatus.CREATED);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @PatchMapping(path = "/updateBook")
    public ResponseEntity<?> updateBook(@RequestBody @Valid BookRequest bookRequest) {
        try {
            BookResponse bookResponse = bookService.updateBook(bookRequest);
            return new ResponseEntity<>(bookResponse, HttpStatus.CREATED);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/{id}/vote/{vote}")
    public ResponseEntity<?> addVote(@PathVariable String id, @PathVariable Integer vote) {
        try {
            BookResponse book = bookService.addVote(id, vote);
            return new ResponseEntity<>(book, HttpStatus.CREATED);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @PutMapping(path = "/addComment")
    public ResponseEntity<?> addComment(@RequestBody CommentDto comments) {
        try {
            BookResponse book = bookService.addComment(comments);
            return new ResponseEntity<>(book, HttpStatus.CREATED);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable String id) {
        try {
            bookService.deleteBook(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (BadRequestException e){
            throw new BadRequestException(e.getMessage());
        }
    }

}
