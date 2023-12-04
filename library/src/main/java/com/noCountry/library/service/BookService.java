package com.noCountry.library.service;

import com.noCountry.library.dto.Book.BookCardResponse;
import com.noCountry.library.dto.Book.BookRequest;
import com.noCountry.library.dto.Book.BookResponse;

import java.util.List;

public interface BookService {

    BookResponse createdBook(BookRequest book) throws Exception;

    void deleteBook(String id);

    BookResponse updateBook(BookRequest book);

    BookResponse getBookById(String id);

    List<BookResponse> getAllBooks();

    BookCardResponse getBookForCard(String id);

    List<BookCardResponse> getAllBooksForCard();

    void addImagesBook(String id, String img);


    BookResponse addQuantityAvailable(String id, Integer amount);

    BookResponse subtractAmount(String id, Integer amount);

    BookResponse addVote(String id, Integer vote);



    List<BookResponse> searchByGenre(String genre);

    List<BookResponse> searchByTrend();

    List<BookResponse> searchByHighestRating();

    List<BookResponse> searchByAuthor(String idAuthor);

    List<BookResponse> searchByEditorial(String idEditorial);

    List<BookResponse> searchByTitle(String title);

    List<BookResponse> searchLastAdditions();


}
