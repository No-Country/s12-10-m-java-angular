package com.noCountry.library.repository;

import com.noCountry.library.entities.Author;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, String> {

	Optional<Author> findByName(String name);

	List<Author> findByStatusTrue();

}
