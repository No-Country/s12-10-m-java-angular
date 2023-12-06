package com.noCountry.library.service.impl;

import com.noCountry.library.dto.Author.AuthorDto;
import com.noCountry.library.dto.Author.MapperAuthor;
import com.noCountry.library.entities.Author;
import com.noCountry.library.exception.BadRequestException;
import com.noCountry.library.repository.AuthorRepository;
import com.noCountry.library.service.AuthorService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthorServiceImpl implements AuthorService {

	@Autowired
	private AuthorRepository authorRepository;
	@Autowired
	private MapperAuthor mapperAuthor;

	@Override
	public AuthorDto save(AuthorDto authorDto) {
		Optional<Author> auxAuthor = authorRepository.findById(authorDto.getId());
		if (auxAuthor.isPresent()) {
			throw new BadRequestException("El author ingresado ya existe");
		}

		Author author = mapperAuthor.authorDtoToAuthor(authorDto);
		author.setCreationDate(LocalDate.now());
		author.setModificationDate(LocalDate.now());

		authorRepository.save(author);

		return mapperAuthor.authorToAuthorDto(author);
	}
	
	@Override
	public List<AuthorDto> getAll() {
		List<Author> list = authorRepository.findByStatusTrue();

		return list.stream().map(mapperAuthor::authorToAuthorDto).collect(Collectors.toList());
	}

	@Override
	public ResponseEntity<String> update(String id, AuthorDto authorDto) {
		ResponseEntity<String> response = null;
		Optional<Author> authorOptional = authorRepository.findById(id);
		try {
			if (authorOptional.isPresent()) {
				Author author = authorOptional.get();
				author.setName(authorDto.getName());
				author.setLastName(authorDto.getLastName());
				author.setBirthday(authorDto.getBirthday());
				author.setNationality(authorDto.getNationality());
				author.setBiography(authorDto.getBiography());
				author.setModificationDate(LocalDate.now());
				authorRepository.save(author);
				response = ResponseEntity.ok("Author with ID " + id + " updated successfully");
			} else {
				response = ResponseEntity.status(HttpStatus.NOT_FOUND).body("Author with ID " + id + " not found");
			}
		} catch (Exception e) {
			e.printStackTrace();
			response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to delete author with ID " + id);
		}
		return response;
	}

	@Override
	public ResponseEntity<String> delete(String id) {
		ResponseEntity<String> response = null;
		Optional<Author> author = authorRepository.findById(id);
		try {
			if (author.isPresent()) {
				Author logicalAuthorRemoval = author.get();
				logicalAuthorRemoval.setStatus(Boolean.FALSE);
				logicalAuthorRemoval.setModificationDate(LocalDate.now());
				authorRepository.save(logicalAuthorRemoval);
				response = ResponseEntity.ok("Author with ID " + id + " logically removed successfully");
			} else {
				response = ResponseEntity.status(HttpStatus.NOT_FOUND).body("Author with ID " + id + " not found");
			}
		} catch (Exception e) {
			e.printStackTrace();
			response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to delete author with ID " + id);
		}
		return response;
	}
	
}
