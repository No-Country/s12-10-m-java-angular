package com.noCountry.library.dto;

import lombok.Data;

import java.io.Serializable;
@Data
public class RegisterRequest implements Serializable{

        private String id;
        private String name;
        private String lastName;
        private String email;
        private String password;
        private String passwordRepeat;
}
