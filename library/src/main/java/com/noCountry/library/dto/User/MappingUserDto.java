package com.noCountry.library.dto.User;

import com.noCountry.library.entities.User;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

public class MappingUserDto {


    public static User userDtoToUser(UserDto userDto) {
        User user = new User();

        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());

        user.setModificationDate(LocalDate.now());

        return user;
    }

    public UserDto userToUserDto(User user) {
        UserDto userDto = new UserDto();

        userDto.setName(user.getName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());


        return userDto;
    }


}
