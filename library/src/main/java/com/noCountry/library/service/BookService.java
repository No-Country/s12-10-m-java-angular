package com.noCountry.library.service;

import com.noCountry.library.dto.Book.*;
import com.noCountry.library.dto.Comment.CommentDto;

import java.util.List;

public interface BookService {

    BookResponse addInformationBook(BookRequest book) throws Exception;

    void createBook(CreateBookRequest book);


    void deleteBook(String id);

    BookResponse updateBook(BookRequest book);

    BookResponse getBookById(String id);

    PaginatedResponseDTO<BookResponse> getAllBooks(Integer pageNumber, Integer sizeElement);

    BookCardResponse getBookForCard(String id);

    PaginatedResponseDTO<BookCardResponse> getAllBooksForCard(Integer pageNumber, Integer sizeElement);

    BookCardDescription getBookForCardDescription(String id);

    PaginatedResponseDTO<BookCardDescription> getAllBooksForCardDescription(Integer pageNumber, Integer sizeElement);

    PaginatedResponseDTO<BookToSearch> getBooksByCriteria(Integer pageNumber, Integer sizeElement,
                                                          Double minPrice, Double maxPrice, Integer minPages,
                                                          List<String> genres, List<String> languages, String searchText,
                                                          Integer searchEvenNotAvailable, String orderBy, String ascOrDesc);

    void addImagesBook(String id, UrlImage image);


    BookResponse addQuantityAvailable(String id, Integer amount);

    BookResponse subtractAmount(String id, Integer amount);

    BookResponse addVote(String id, Integer vote);

    BookResponse addComment(CommentDto comments);


    PaginatedResponseDTO<BookToSearch> searchByText(String searchText, Integer pageNumber, Integer sizeElement,
                                                    String orderBy, String ascOrDesc);

    PaginatedResponseDTO<BookToSearch> searchByGenre(String genre, Integer pageNumber, Integer sizeElement);

    PaginatedResponseDTO<BookToSearch> searchByTitle(String title, Integer pageNumber, Integer sizeElement);

    PaginatedResponseDTO<BookToSearch> searchLatestAdded(Integer pageNumber, Integer sizeElement);

    PaginatedResponseDTO<BookToSearch> searchByHighestRating(Integer pageNumber, Integer sizeElement);

    PaginatedResponseDTO<CommentDto> getCommentsByBookId(String bookId, Integer pageNumber, Integer sizeElement);



}
