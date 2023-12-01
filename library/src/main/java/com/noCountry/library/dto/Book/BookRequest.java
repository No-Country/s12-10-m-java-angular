package com.noCountry.library.dto.Book;

import com.noCountry.library.entities.enums.Genre;
import lombok.Data;

import java.util.ArrayList;

@Data
public class BookRequest {

    private String idBook;

    private Long ISBN;
    private String title;
    private Double price;
    private Integer pages;
    private Integer quantityAvailable;
    private String description;
    private String genre;

    private String idAuthor;
    private String idEditorial;

    private String initialImage;

}
