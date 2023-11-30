package com.noCountry.library.service.impl;

import com.noCountry.library.dto.Book.BookResponse;
import com.noCountry.library.dto.Editorial.EditorialDto;
import com.noCountry.library.dto.Editorial.MapperEditorial;
import com.noCountry.library.entities.Editorial;
import com.noCountry.library.exception.BadRequestException;
import com.noCountry.library.exception.NotFoundException;
import com.noCountry.library.repository.EditorialRepository;
import com.noCountry.library.service.EditorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

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
    public EditorialDto createEditorial(EditorialDto editorialDto) throws IllegalAccessException {

        Optional<Editorial> auxEditorial = editorialRepository.findById(editorialDto.getIdEditorial());
        if (auxEditorial.isPresent()) {
            throw new BadRequestException("La editorial ya se encuentra registrada");
        }

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



    private void isEmptyEditorial(Optional<Editorial> editorial) throws NotFoundException {
        if (editorial.isEmpty()){
            throw new NotFoundException("Could not found editorial");
        }
    }





}
