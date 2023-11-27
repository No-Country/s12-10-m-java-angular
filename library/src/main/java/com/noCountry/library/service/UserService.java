package com.noCountry.library.service;

import com.noCountry.library.dto.RegisterRequest;
import com.noCountry.library.entities.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

public interface UserService {
    User registeUser(RegisterRequest newUser);

    Optional<User> findByEmail(String email);
}
