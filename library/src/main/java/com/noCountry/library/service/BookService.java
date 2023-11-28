package com.noCountry.library.service;

import com.noCountry.library.dto.Book.BookCardResponse;
import com.noCountry.library.dto.Book.BookRequest;
import com.noCountry.library.dto.Book.BookResponse;

public interface BookService {

    public BookResponse createdBook(BookRequest book);

    public void deleteBook(String id);

    public BookResponse updateBook(BookRequest book);

    public BookResponse getBookById(String id);

    public BookCardResponse getBookForCard(String id);

    public void addImagesBook(String id, String img);

}
