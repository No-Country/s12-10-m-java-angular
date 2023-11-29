package com.noCountry.library.dto.Editorial;

import com.noCountry.library.entities.Editorial;
import org.springframework.stereotype.Component;

@Component
public class MapperEditorial {

    public Editorial editorialDtoToEditorial(EditorialDto editorialDto) {
        Editorial editorial = new Editorial();

        editorial.setId(editorialDto.getIdEditorial());
        editorial.setName(editorialDto.getName());
        editorial.setEmail(editorialDto.getEmail());

        return editorial;
    }

    public EditorialDto editorialToEditorialDto(Editorial editorial) {
        EditorialDto editorialDto = new EditorialDto();

        editorialDto.setIdEditorial(editorial.getId());
        editorialDto.setName(editorial.getName());
        editorialDto.setEmail(editorial.getEmail());

        return editorialDto;
    }


}
