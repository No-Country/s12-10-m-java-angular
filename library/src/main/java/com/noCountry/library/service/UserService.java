package com.noCountry.library.service;

import com.noCountry.library.dto.Register;
import com.noCountry.library.dto.User.UserDto;
import com.noCountry.library.entities.User;

import java.util.UUID;

public interface UserService {


    public User createUser(Register userDTO);

    public void updateUser(UserDto userDTO);

    public void updatePasswordUser(UserDto userDTO);

    public void deleteUser(UUID id);

    public User getUserById(UUID id);

    public void unsubscribeEmailUser(UUID id);


}
