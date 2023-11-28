package com.noCountry.library.service;

import org.springframework.http.ResponseEntity;

import com.noCountry.library.entities.Author;

public interface AuthorService {
	
	public ResponseEntity<String> save (Author author);
	
}
