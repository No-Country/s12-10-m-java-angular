package com.noCountry.library.service.impl;

import com.noCountry.library.dto.Register;
import com.noCountry.library.dto.User.UserDto;
import com.noCountry.library.entities.User;
import com.noCountry.library.entities.enums.Role;
import com.noCountry.library.repository.UserRepository;
import com.noCountry.library.service.EmailService;
import com.noCountry.library.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final EmailService emailService;



    @Autowired
    public UserServiceImpl(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }


    @Override
    public User createUser(Register userDTO) {
        User user = new User();
        Map<String, Object> templateModel = new HashMap<>();

        user.setId(UUID.randomUUID());
        user.setCreationDate(LocalDate.now());
        user.setModificationDate(LocalDate.now());

        user.setName(userDTO.name);
        user.setLastName(userDTO.lastName);
        user.setEmail(userDTO.email);
        user.setPassword(userDTO.password);

        user.setRole(Role.USER);

        userRepository.save(user);
        System.out.println(" Usuario agregado exitosamente....");


        templateModel.put("userName", userDTO.name);
        templateModel.put("libraryName", "Libreria YEY!");

        emailService.sendWelcomeEmail(userDTO.email,
               "Bienvenido a la librería YEY!",
               "welcome.html", templateModel);

        System.out.println("Se envio el email ok..");

        return user;
    }


    @Transactional
    @Override
    public void updateUser(UserDto userDTO) {




        emailService.sendSimpleEmail(userDTO.email, "Actualización de informacion",
                "Su informacion ha sido actualizada exitosamente.");

    }

    @Transactional
    @Override
    public void updatePasswordUser(UserDto userDTO) {



        emailService.sendSimpleEmail(userDTO.email, "Actualización de contraseña",
                "Su contraseña ha sido actualizada exitosamente.");

    }


    @Transactional
    @Override
    public User getUserById(UUID id) {


        return userRepository.findById(id).get();
    }

    @Transactional
    @Override
    public void deleteUser(UUID id) {

        User user = userRepository.findById(id).get();
        user.setModificationDate(LocalDate.now());
        user.setStatus(false);

        // al tener el atributo status, solo lo actualizo a false, y no toco la bd?
        // o sino hago el delete en la bd?
        // averiguar en q casos se realiza el borrado logico y en cuales no
        userRepository.deleteById(id);

    }

    @Transactional
    @Override
    public void unsubscribeEmailUser(UUID id) {

        User user = userRepository.findById(id).get();

        if (user.getIsSubscribed()) {
            user.setIsSubscribed(false);
        }

        userRepository.save(user);
    }


}
