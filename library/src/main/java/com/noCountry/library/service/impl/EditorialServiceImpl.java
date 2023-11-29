package com.noCountry.library.service.impl;

import com.noCountry.library.dto.Book.BookResponse;
import com.noCountry.library.dto.Editorial.EditorialDto;
import com.noCountry.library.dto.Editorial.MapperEditorial;
import com.noCountry.library.entities.Editorial;
import com.noCountry.library.repository.EditorialRepository;
import com.noCountry.library.service.EditorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EditorialServiceImpl implements EditorialService {

    private final EditorialRepository editorialRepository;

    private final MapperEditorial mapperEditorial;

    @Autowired
    public EditorialServiceImpl(EditorialRepository editorialRepository, MapperEditorial mapperEditorial) {
        this.editorialRepository = editorialRepository;
        this.mapperEditorial = mapperEditorial;
    }

    @Override
    public EditorialDto createEditorial(EditorialDto editorialDto) {
        Editorial editorial = mapperEditorial.editorialDtoToEditorial(editorialDto);

        editorial.setStatus(true);
        editorial.setCreationDate(LocalDate.now());
        editorial.setModificationDate(LocalDate.now());

        editorialRepository.save(editorial);

        return mapperEditorial.editorialToEditorialDto(editorial);
    }

    @Override
    public void deleteEditorial(String id) {
        Editorial editorial = editorialRepository.findById(id).get();

        editorial.setStatus(false);
        editorial.setModificationDate(LocalDate.now());

        editorialRepository.save(editorial);
    }

    @Override
    public EditorialDto getById(String id) {
        return null;
    }

    @Override
    public List<BookResponse> listBookOfEditorial(String id) {
        return null;
    }

    @Override
    public void addBookToEditorial(String idEditorial, String idBook) {

    }


}
