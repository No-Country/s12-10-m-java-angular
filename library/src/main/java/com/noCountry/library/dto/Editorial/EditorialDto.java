package com.noCountry.library.dto.Editorial;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EditorialDto {

    @NotBlank(message = "Este campo es obligatorio")
    private String idEditorial;

    @NotBlank (message = "Este campo es obligatorio")
    private String name;


    private String url;

}
