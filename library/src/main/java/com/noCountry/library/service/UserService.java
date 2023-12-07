package com.noCountry.library.service;

import com.noCountry.library.dto.User.UpdatePasswordDto;
import com.noCountry.library.dto.User.UserDto;
import com.noCountry.library.entities.User;
import com.noCountry.library.dto.auth.RegisterRequest;

import java.util.Optional;

public interface UserService {

    User registeUser(RegisterRequest newUser);

    Optional<User> findByEmail(String email);

    UserDto getUser(String email);

    UserDto updateUser(UserDto userDTO);

    void updatePasswordUser(UpdatePasswordDto userDTO);

    void olvidoContraseña();

    void deleteUser(String email);

    void unsubscribeEmailUser(String email);


}
