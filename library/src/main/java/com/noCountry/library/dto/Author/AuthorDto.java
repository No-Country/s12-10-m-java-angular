package com.noCountry.library.dto.Author;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AuthorDto {

    @NotBlank(message = "Este campo es obligatorio")
    private String id;

    @NotBlank(message = "Este campo es obligatorio")
    private String name;

    @NotBlank(message = "Este campo es obligatorio")
    private String lastName;

    private LocalDate birthday;

    private String nationality;

    private String biography;

}
