package com.noCountry.library.dto.Author;

import com.noCountry.library.entities.Author;
import org.springframework.stereotype.Component;

@Component
public class MapperAuthor {

    public Author authorDtoToAuthor(AuthorDto authorDto) {
        Author author = new Author();

        author.setId(authorDto.getId());
        author.setName(authorDto.getName());
        author.setLastName(authorDto.getLastName());
        author.setBirthday(authorDto.getBirthday());
        author.setBiography(authorDto.getBiography());
        author.setNationality(authorDto.getNationality());

        return author;
    }

    public AuthorDto authorToAuthorDto(Author author) {
        AuthorDto authorDto = new AuthorDto();

        authorDto.setId(author.getId());
        authorDto.setName(author.getName());
        authorDto.setLastName(author.getLastName());
        authorDto.setBirthday(author.getBirthday());
        authorDto.setBiography(author.getBiography());
        authorDto.setNationality(author.getNationality());

        return authorDto;
    }

}
