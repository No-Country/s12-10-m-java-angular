package com.noCountry.library.service;

import com.noCountry.library.dto.Book.*;
import com.noCountry.library.entities.enums.Genre;
import com.noCountry.library.entities.enums.Language;

import java.util.List;

public interface BookService {

    BookResponse createdBook(BookRequest book) throws Exception;

    void deleteBook(String id);

    BookResponse updateBook(BookRequest book);

    BookResponse getBookById(String id);

    PaginatedBookResponseDTO<BookResponse> getAllBooks(Integer pageNumber, Integer sizeElement);

    BookCardResponse getBookForCard(String id);

    PaginatedBookResponseDTO<BookCardResponse> getAllBooksForCard(Integer pageNumber, Integer sizeElement);

    BookCardDescription getBookForCardDescription(String id);

    PaginatedBookResponseDTO<BookCardDescription> getAllBooksForCardDescription(Integer pageNumber, Integer sizeElement);

    PaginatedBookResponseDTO<BookToSearch> getBooksByCriteria(Integer pageNumber, Integer sizeElement,
                                                   Double minPrice, Double maxPrice, Integer minPages,
                                                   String genre, String language, Integer searchEvenNotAvailable);

    void addImagesBook(String id, String img);


    BookResponse addQuantityAvailable(String id, Integer amount);

    BookResponse subtractAmount(String id, Integer amount);

    BookResponse addVote(String id, Integer vote);



    PaginatedBookResponseDTO<BookResponse> searchByGenre(String genre, Integer pageNumber, Integer sizeElement);

    List<BookResponse> searchByTrend();

    List<BookResponse> searchByHighestRating();

    List<BookResponse> searchByTitle(String title);

    List<BookResponse> searchLastAdditions();


}
