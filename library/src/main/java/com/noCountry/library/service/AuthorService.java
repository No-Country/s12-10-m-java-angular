package com.noCountry.library.service;

import java.util.List;

import com.noCountry.library.dto.Author.AuthorDto;

import org.springframework.http.ResponseEntity;

import com.noCountry.library.entities.Author;

public interface AuthorService {

	List<Author> getAll();

	AuthorDto save(AuthorDto authorDto);
	
	ResponseEntity<String> delete(String id);

}
