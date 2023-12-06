package com.noCountry.library.service;

import com.noCountry.library.dto.Book.BookCardResponse;
import com.noCountry.library.dto.Book.BookRequest;
import com.noCountry.library.dto.Book.BookResponse;

import java.util.List;

public interface BookService {

    public BookResponse createdBook(BookRequest book);

    public void deleteBook(String id);

    public BookResponse updateBook(BookRequest book);

    public BookResponse getBookById(String id);

    public List<BookResponse> getAllBooks();

    public BookCardResponse getBookForCard(String id);

    public List<BookCardResponse> getAllBooksForCard();

    public void addImagesBook(String id, String img);

}
