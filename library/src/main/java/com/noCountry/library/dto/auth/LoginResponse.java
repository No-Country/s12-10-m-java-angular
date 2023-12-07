package com.noCountry.library.dto.auth;

import lombok.Data;

import java.io.Serializable;

@Data
public class LoginResponse implements Serializable {

    private String jwt;
}
