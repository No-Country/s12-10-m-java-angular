package com.noCountry.library.repository;

import com.noCountry.library.entities.Book;
import com.noCountry.library.entities.enums.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {

    Optional<List<Book>> findByGenre(Genre genre);

    Optional<List<Book>> findByTitleContaining(String partialTitle);


    Optional<List<Book>> findByAuthorId(String authorId);

    Optional<List<Book>> findByEditorialId(String editorialId);


    Optional<List<Book>> findTop5ByOrderBySalesAmountDesc();

    Optional<List<Book>> findTop5ByOrderBySalesAmountAsc();

    Optional<List<Book>> findTop5ByOrderByRatingDesc();

    Optional<List<Book>> findTop5ByOrderByRatingAsc();




}
