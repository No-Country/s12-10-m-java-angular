package com.noCountry.library.dto.Book;

import com.noCountry.library.entities.enums.Genre;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
public class BookRequest {

    @NotBlank(message = "Este campo es obligatorio")
    private String idBook;

    @NotBlank (message = "Este campo es obligatorio")
    private String ISBN;

    @NotBlank (message = "Este campo es obligatorio")
    private String title;

    @NotBlank (message = "Este campo es obligatorio")
    private Double price;

    @NotBlank (message = "Este campo es obligatorio")
    private Integer pages;

    @NotBlank (message = "Este campo es obligatorio")
    private LocalDate publicationDate;

    @NotBlank (message = "Este campo es obligatorio")
    private Integer quantityAvailable;

    @NotBlank (message = "Este campo es obligatorio")
    private String description;

    private String collection;

    @NotBlank (message = "Este campo es obligatorio")
    private String genre;

    @NotBlank (message = "Este campo es obligatorio")
    private String language;

    @NotBlank (message = "Este campo es obligatorio")
    private String idAuthor;

    @NotBlank (message = "Este campo es obligatorio")
    private String idEditorial;

    @NotBlank (message = "Este campo es obligatorio")
    private String initialImage;

}
