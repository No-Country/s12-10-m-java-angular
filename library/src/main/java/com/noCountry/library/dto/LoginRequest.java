package com.noCountry.library.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
    @NotBlank (message = "Este campo es obligatorio")
    private String email;
    @NotBlank (message = "Este campo es obligatorio")
    @Email(message = "El formato del mail es invalido")
    private String password;
}
