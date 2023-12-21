package com.noCountry.library.dto.Book;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.noCountry.library.entities.UrlImage;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Data
public class BookResponse {

    private String idBook;

    private String ISBN;
    private String title;
    private Double price;
    private Integer pages;
    private LocalDate publicationDate;
    private Integer quantityAvailable;
    private Integer salesAmount;
    private Double rating;
    private String description;
    private String collection;
    private String genre;
    private String language;

    @JsonProperty("author")
    private String completeNameAuthor;
    private String nameEditorial;

    private List<String> urlImages;

}
