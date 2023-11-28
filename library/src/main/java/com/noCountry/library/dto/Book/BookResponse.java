package com.noCountry.library.dto.Book;

import lombok.Data;

import java.util.ArrayList;

@Data
public class BookResponse {

    private String idBook;

    private Long ISBN;
    private String title;
    private Double price;
    private Integer pages;
    private Integer quantity;
    private String description;
    private String genre;

    private String completeNameAuthor;
    private String nameEditorial;

    private ArrayList<String> urlImages;

}
