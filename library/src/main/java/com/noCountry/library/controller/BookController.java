package com.noCountry.library.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.noCountry.library.dto.Book.BookCardResponse;
import com.noCountry.library.dto.Book.BookRequest;
import com.noCountry.library.dto.Book.BookResponse;
import com.noCountry.library.dto.Book.UrlImage;
import com.noCountry.library.service.impl.BookServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "${ALLOWED_ORIGINS}")
@RestController
@RequestMapping("/book")
public class BookController {

    private final BookServiceImpl bookService;

    @Autowired
    public BookController(BookServiceImpl bookService) {
        this.bookService = bookService;
    }


    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getBookById(@PathVariable String id) throws Exception {
        try {
            BookResponse book = bookService.getBookById(id);
            return new ResponseEntity<>(book, HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @GetMapping(path = "/allBooks")
    public ResponseEntity<?> getAllBooks() throws Exception {
        try {
            List<BookResponse> books = bookService.getAllBooks();
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @GetMapping(path = "/toCard/{id}")
    public ResponseEntity<?> getBookByIdToCard(@PathVariable String id) throws Exception {
        try {
            BookCardResponse book = bookService.getBookForCard(id);
            return new ResponseEntity<>(book, HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @GetMapping(path = "/toCard/allBooks")
    public ResponseEntity<?> getAllBooksToCard() throws Exception {
        try {
            List<BookCardResponse> books = bookService.getAllBooksForCard();
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @PostMapping(path = "/createBook")
    public ResponseEntity<?> createBook(@RequestBody @Valid BookRequest bookRequest) throws Exception {
        try {
            BookResponse bookResponse = bookService.createdBook(bookRequest);
            return new ResponseEntity<>(bookResponse, HttpStatus.CREATED);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @PostMapping(path = "/addImage/{id}")
    public ResponseEntity<?> addImageAtBook(@RequestBody @Valid UrlImage image, @PathVariable String id) throws Exception {
        try {
            bookService.addImagesBook(id, image.getImage());
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }


    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable String id) throws Exception {
        try {
            bookService.deleteBook(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }


}
