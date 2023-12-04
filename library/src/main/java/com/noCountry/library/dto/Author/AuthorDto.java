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

    @NotBlank(message = "Este campo es obligatorio")
    private LocalDate birthday;

    @NotBlank(message = "Este campo es obligatorio")
    private String nationality;

    @NotBlank(message = "Este campo es obligatorio")
    private String biography;

}
