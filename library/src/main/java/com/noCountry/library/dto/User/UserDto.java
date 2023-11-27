package com.noCountry.library.dto.User;

import lombok.Data;

import java.util.UUID;

@Data
public class UserDto {

    public UUID id;
    public String name;
    public String lastName;
    public String email;
    public String password;


}
