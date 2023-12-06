package com.noCountry.library.dto.Book;

import lombok.Data;

@Data
public class BookToSearch {

    private String ID;
    private String author;
    private String name;
    private Double price;
    private String image;
    private String description;

}
