package com.noCountry.library.repository;

import com.noCountry.library.entities.Book;
import com.noCountry.library.entities.enums.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, String>, JpaSpecificationExecutor<Book> {

    List<Book> findAllByStatusTrue();

    Page<Book> findAllByStatusTrue(Pageable pageable);

    Optional<Book> findByISBN(String isbn);

    Page<Book> findByGenreAndStatusTrue(Genre genre, Pageable pageable);

    Page<Book> findByTitleContainingAndStatusTrue(String partialTitle, Pageable pageable);

    Page<Book> findAllByStatusTrueOrderByCreationDateDesc(Pageable pageable);

    Page<Book> findAllByStatusTrueOrderByRatingDesc(Pageable pageable);

    Page<Book> findAllByStatusTrueOrderBySalesAmountDesc(Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE Book b SET b.rating = :nuevoRating WHERE b.id = :bookId")
    void asignarRatingABook(@Param("bookId") String bookId, @Param("nuevoRating") Double nuevoRating);




}
