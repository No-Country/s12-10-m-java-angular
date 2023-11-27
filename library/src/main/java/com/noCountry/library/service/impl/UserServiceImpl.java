package com.noCountry.library.service.impl;

import com.noCountry.library.dto.RegisterRequest;
import com.noCountry.library.entities.User;
import com.noCountry.library.entities.enums.Role;
import com.noCountry.library.exception.InvalidPasswordException;
import com.noCountry.library.repository.UserRepository;
import com.noCountry.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registeUser(RegisterRequest newUser) {

        User user = new User();
        validatePassword(newUser);

        user.setId(newUser.getId());
        user.setName(newUser.getName());
        user.setLastName(newUser.getLastName());
        user.setEmail(newUser.getEmail());
        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        user.setRole(Role.USER);
        user.setStatus(true);

        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    private void validatePassword(RegisterRequest newUser) {
        if (!StringUtils.hasText(newUser.getPassword()) || !StringUtils.hasText(newUser.getPasswordRepeat())){ // Valida que contenga texto
            throw new InvalidPasswordException("Las contraseñas no coinciden");
        }
        if (!newUser.getPassword().equals(newUser.getPasswordRepeat())){ //Que las contraseñas considan
            throw new InvalidPasswordException("Las contraseñas no coinciden");
        }

    }
}
