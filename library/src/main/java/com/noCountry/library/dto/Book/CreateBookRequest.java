package com.noCountry.library.dto.Book;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateBookRequest {

    @NotBlank(message = "Este campo es obligatorio")
    private String idBook;

    @NotBlank (message = "Este campo es obligatorio")
    private String ISBN;

    @NotBlank (message = "Este campo es obligatorio")
    private String title;


}
