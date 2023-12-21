package com.noCountry.library.repository;

import com.noCountry.library.entities.Author;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, String> {

	Optional<Author> findByFullNameAndStatusTrue(String name);

	@Query("SELECT a FROM Author a WHERE LOWER(a.fullName) = LOWER(:name) AND a.status = true")
	Optional<Author> findByFullNameIgnoreCaseAndStatusTrue(@Param("name") String name);


	List<Author> findByStatusTrue();

}
