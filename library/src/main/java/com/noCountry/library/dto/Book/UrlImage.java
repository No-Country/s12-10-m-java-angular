package com.noCountry.library.dto.Book;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UrlImage {

    @NotBlank(message = "Este campo es obligatorio")
    private String image;

    @NotBlank(message = "Este campo es obligatorio")
    private Boolean isBookCover;

}
