package com.noCountry.library.controller;

import java.util.List;
import com.noCountry.library.dto.Author.AuthorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noCountry.library.entities.Author;
import com.noCountry.library.service.impl.AuthorServiceImpl;


@CrossOrigin(origins = "${ALLOWED_ORIGINS}")
@RestController
@RequestMapping("/author")
public class AuthorController {

	@Autowired
	private AuthorServiceImpl service;

	@PostMapping(path = "/save")
	public ResponseEntity<?> createAuthor(@RequestBody AuthorDto authorDto) throws Exception {
		try {
			AuthorDto author = service.save(authorDto);
			return new ResponseEntity<>(author, HttpStatus.CREATED);
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}
	
	@PutMapping("/delete/{id}")
	public ResponseEntity<String> delete(@PathVariable String id) {
		return service.delete(id);
	}
	
	@GetMapping("/list")
	public List<Author> getAll (){
		return service.getAll();
	}

}
