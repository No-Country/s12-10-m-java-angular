package com.noCountry.library.controller;

import java.util.List;
import com.noCountry.library.dto.Author.AuthorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

	@GetMapping("/list")
	public List<AuthorDto> getAll() {
		return service.getAll();
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<String> update(@PathVariable String id, @RequestBody AuthorDto authorDto) {
		return service.update(id, authorDto);
	}

	@PutMapping("/delete/{id}")
	public ResponseEntity<String> delete(@PathVariable String id) {
		return service.delete(id);
	}

}
