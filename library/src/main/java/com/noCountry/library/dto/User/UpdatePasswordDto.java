package com.noCountry.library.dto.User;

import lombok.Data;

@Data
public class UpdatePasswordDto {

    private String email;
    private String password;
    private String passwordRepeat;

}
