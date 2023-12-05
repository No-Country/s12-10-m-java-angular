package com.noCountry.library.service.impl;

import com.noCountry.library.entities.Author;
import com.noCountry.library.repository.AuthorRepository;
import com.noCountry.library.service.AuthorService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthorServiceImpl implements AuthorService {

	@Autowired
	private AuthorRepository authorRepository;

	@Override
	public ResponseEntity<String> save(Author author) {
		ResponseEntity<String> response = null;
		try {
			Optional<Author> existingAuthor = authorRepository.findByName(author.getName());
			if (existingAuthor.isPresent()) {
				response = ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Autor ya registrado");
			} else {
				author.setStatus(Boolean.TRUE);
				author.setCreationDate(LocalDate.now());
				author.setModificationDate(LocalDate.now());

				authorRepository.save(author);
				response = ResponseEntity.ok("Author: " + author.getName() + " saved succesfully");
			}
		} catch (Exception e) {
			e.printStackTrace();
			response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to save author: " + author.getName());
		}
		return response;

	}

	@Override
	public List<Author> getAll() {
		List<Author> list = new ArrayList<>();
		try {
			list = authorRepository.findByStatusTrue();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	
}
