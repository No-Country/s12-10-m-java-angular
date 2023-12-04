package com.noCountry.library.service;

import com.noCountry.library.dto.Author.AuthorDto;
import org.springframework.http.ResponseEntity;

import com.noCountry.library.entities.Author;

public interface AuthorService {
	
	//ResponseEntity<String> save (Author author);

	AuthorDto createAuthor(AuthorDto authorDto);
	
}
