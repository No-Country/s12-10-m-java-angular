package com.noCountry.library.service.impl;

import com.noCountry.library.dto.Book.BookResponse;
import com.noCountry.library.dto.Book.MapperBooks;
import com.noCountry.library.dto.Editorial.EditorialDto;
import com.noCountry.library.dto.Editorial.MapperEditorial;
import com.noCountry.library.entities.Book;
import com.noCountry.library.entities.Editorial;
import com.noCountry.library.exception.BadRequestException;
import com.noCountry.library.exception.NotFoundException;
import com.noCountry.library.repository.BookRepository;
import com.noCountry.library.repository.EditorialRepository;
import com.noCountry.library.service.EditorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EditorialServiceImpl implements EditorialService {

    private final EditorialRepository editorialRepository;

    private final MapperEditorial mapperEditorial;

    private final MapperBooks mapperBooks;

    @Autowired
    public EditorialServiceImpl(EditorialRepository editorialRepository, MapperEditorial mapperEditorial,
                                MapperBooks mapperBooks) {
        this.editorialRepository = editorialRepository;
        this.mapperEditorial = mapperEditorial;
        this.mapperBooks = mapperBooks;
    }

    @Override
    public EditorialDto createEditorial(EditorialDto editorialDto) throws IllegalAccessException {

        Optional<Editorial> auxEditorial = editorialRepository.findById(editorialDto.getIdEditorial());
        if (auxEditorial.isPresent()) {
            throw new BadRequestException("La editorial ya se encuentra registrada");
        }

        Editorial editorial = mapperEditorial.editorialDtoToEditorial(editorialDto);

        editorial.setCreationDate(LocalDate.now());
        editorial.setModificationDate(LocalDate.now());

        editorialRepository.save(editorial);

        return mapperEditorial.editorialToEditorialDto(editorial);
    }

    @Override
    public void deleteEditorial(String id) {
        Editorial editorial = getExistingEditorial(id);

        editorial.setStatus(false);
        editorial.setModificationDate(LocalDate.now());

        editorialRepository.save(editorial);
    }

    @Override
    public EditorialDto getEditorialById(String id) {
        Editorial editorial = getExistingEditorial(id);

        return mapperEditorial.editorialToEditorialDto(editorial);
    }

    @Override
    public List<BookResponse> getListBookOfEditorial(String id) {
        Editorial editorial = getExistingEditorial(id);

        if (editorial.getBooks().isEmpty()) {
            throw new BadRequestException("No hay libros cargados en la editorial " + editorial.getName());
        }

        return mapperBooks.listBooksToListResponseBooks(editorial.getBooks());
    }

    @Override
    public EditorialDto updateEditorial(EditorialDto editorial) {
        Editorial editorialUpdate = getExistingEditorial(editorial.getIdEditorial());

        if (editorial.getUrl() != null) {
            editorialUpdate.setUrl(editorial.getUrl());
        }

        if (editorial.getName() != null) {
            editorialUpdate.setName(editorial.getName());
        }

        editorialRepository.save(editorialUpdate);
        editorialUpdate.setModificationDate(LocalDate.now());

        return mapperEditorial.editorialToEditorialDto(editorialUpdate);
    }

    private Editorial getExistingEditorial(String id) throws NotFoundException {
        Optional<Editorial> auxEditorial = editorialRepository.findById(id);

        if (auxEditorial.isEmpty()){
            throw new NotFoundException("Could not found editorial");
        }

        return auxEditorial.get();
    }


}
