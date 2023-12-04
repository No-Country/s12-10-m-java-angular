package com.noCountry.library.service;

import com.noCountry.library.dto.Book.BookResponse;
import com.noCountry.library.dto.Editorial.EditorialDto;

import java.util.List;

public interface EditorialService {

    EditorialDto createEditorial(EditorialDto editorialDto) throws IllegalAccessException;

    void deleteEditorial(String id);

    EditorialDto getEditorialById(String id);

    List<BookResponse> getListBookOfEditorial(String id);

    void addBookToEditorial(String idEditorial, String idBook);

}
