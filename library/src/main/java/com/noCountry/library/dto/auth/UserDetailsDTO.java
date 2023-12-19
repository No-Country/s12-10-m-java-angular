package com.noCountry.library.dto.auth;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class UserDetailsDTO implements Serializable {

        private String id;
        private String name;
        private String lastName;
        private String email;
        private String role;
        private List<?> list;
        private String jwt;

}
