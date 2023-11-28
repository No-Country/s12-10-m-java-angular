package com.noCountry.library.dto.Book;

import lombok.Data;

import java.util.ArrayList;

@Data
public class BookCardResponse {

    private String title;
    private Double price;
    private  String author;
    private ArrayList<String> urlImages;

}
