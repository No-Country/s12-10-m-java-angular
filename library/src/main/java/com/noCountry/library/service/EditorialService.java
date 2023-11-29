package com.noCountry.library.service;

import com.noCountry.library.dto.Book.BookResponse;
import com.noCountry.library.dto.Editorial.EditorialDto;

import java.util.List;

public interface EditorialService {

    public EditorialDto createEditorial(EditorialDto editorialDto);

    public void deleteEditorial(String id);

    public EditorialDto getById(String id);

    public List<BookResponse> listBookOfEditorial(String id);

    public void addBookToEditorial(String idEditorial, String idBook);

}
