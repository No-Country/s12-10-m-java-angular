package com.noCountry.library.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

	@PostMapping("/save")
	public ResponseEntity<String> save(@RequestBody Author author) {
		return service.save(author);
	}
	
	@GetMapping("/list")
	public List<Author> getAll (){
		return service.getAll();
	}
	
	
}
