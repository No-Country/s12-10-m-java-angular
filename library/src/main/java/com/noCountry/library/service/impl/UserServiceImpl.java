package com.noCountry.library.service.impl;

import com.noCountry.library.dto.RegisterRequest;
import com.noCountry.library.dto.User.MappingUserDto;
import com.noCountry.library.dto.User.ResponseUserDto;
import com.noCountry.library.dto.User.UpdatePasswordDto;
import com.noCountry.library.entities.User;
import com.noCountry.library.entities.enums.Role;
import com.noCountry.library.exception.InvalidPasswordException;
import com.noCountry.library.repository.UserRepository;
import com.noCountry.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import com.noCountry.library.dto.User.UserDto;
import com.noCountry.library.service.EmailService;
import jakarta.transaction.Transactional;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final EmailService emailService;

    private final PasswordEncoder passwordEncoder;

    private final MappingUserDto mapperUser;


    @Autowired
    public UserServiceImpl(UserRepository userRepository, EmailService emailService,
                           PasswordEncoder passwordEncoder, MappingUserDto mapperUser) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.mapperUser = mapperUser;
    }

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

        sendEmailWelcome(newUser.getName(), newUser.getEmail());

        return userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getUserById(String id) {
        return userRepository.findById(id).get();
    }

    @Transactional
    @Override
    public ResponseUserDto updateUser(UserDto userDTO) {

        User updateUser = mapperUser.userDtoToUser(userDTO);

        if (userDTO.getName() != null) {
            updateUser.setName(userDTO.getName());
        }

        if (userDTO.getLastName() != null) {
            updateUser.setName(userDTO.getLastName());
        }

        if (userDTO.getEmail() != null) {
            updateUser.setName(userDTO.getEmail());
        }

        updateUser.setModificationDate(LocalDate.now());
        userRepository.save(updateUser);

        emailService.sendSimpleEmail(userDTO.getEmail(), "Actualización de informacion",
                "Su informacion ha sido actualizada exitosamente.");

        return mapperUser.userToUserDto(updateUser);
    }

    @Transactional
    @Override
    public void updatePasswordUser(UpdatePasswordDto userDTO) {

        // Ver verificaciones de seguridad?

        emailService.sendSimpleEmail(userDTO.getEmail(), "Actualización de contraseña",
                "Su contraseña ha sido actualizada exitosamente.");

    }


    @Transactional
    @Override
    public void deleteUser(String id) {
        User user = userRepository.findById(id).get();
        user.setModificationDate(LocalDate.now());
        user.setStatus(false);

        userRepository.save(user);
    }

    @Transactional
    @Override
    public void unsubscribeEmailUser(String id) {
        User user = userRepository.findById(id).get();

        if (user.getIsSubscribed()) {
            user.setIsSubscribed(false);
            user.setModificationDate(LocalDate.now());
        }

        userRepository.save(user);
    }

    private void validatePassword(RegisterRequest newUser) {
        if (!StringUtils.hasText(newUser.getPassword()) || !StringUtils.hasText(newUser.getPasswordRepeat())){ // Valida que contenga texto
            throw new InvalidPasswordException("Las contraseñas no tienen texto");
        }
        if (!newUser.getPassword().equals(newUser.getPasswordRepeat())){ //Que las contraseñas considan
            throw new InvalidPasswordException("Las contraseñas no coinciden");
        }

    }

    private void sendEmailWelcome(String name, String email) {

        Map<String, Object> templateModel = new HashMap<>();

        templateModel.put("userName", name);
        templateModel.put("libraryName", "Libreria YEY!");

        emailService.sendWelcomeEmail(email,
                "Bienvenido a la librería YEY!",
                "welcome.html", templateModel);
    }


}
