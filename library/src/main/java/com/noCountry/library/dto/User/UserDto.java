package com.noCountry.library.dto.User;

import lombok.Data;


@Data
public class UserDto {

    private String id;
    private String name;
    private String lastName;
    private String email;
    private String password;

}
