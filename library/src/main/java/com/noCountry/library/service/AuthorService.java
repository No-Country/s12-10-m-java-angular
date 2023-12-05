package com.noCountry.library.service;

import java.util.List;

import com.noCountry.library.dto.Author.AuthorDto;

import org.springframework.http.ResponseEntity;

import com.noCountry.library.entities.Author;

public interface AuthorService {

	public ResponseEntity<String> save(Author author);

	public List<Author> getAll();

	AuthorDto createAuthor(AuthorDto authorDto);

}
