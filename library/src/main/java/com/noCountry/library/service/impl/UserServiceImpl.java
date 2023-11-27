package com.noCountry.library.service.impl;

<<<<<<< HEAD
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
import com.noCountry.library.dto.Register;
import com.noCountry.library.dto.User.UserDto;
import com.noCountry.library.service.EmailService;
import jakarta.transaction.Transactional;


import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final EmailService emailService;

    private PasswordEncoder passwordEncoder;



    @Autowired
    public UserServiceImpl(UserRepository userRepository, EmailService emailService,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
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


    private void sendEmailWelcome(String name, String email) {

        Map<String, Object> templateModel = new HashMap<>();

        templateModel.put("userName", name);
        templateModel.put("libraryName", "Libreria YEY!");

        emailService.sendWelcomeEmail(email,
                "Bienvenido a la librería YEY!",
                "welcome.html", templateModel);
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
    public User getUserById(String id) {


        return userRepository.findById(id).get();
    }

    @Transactional
    @Override
    public void deleteUser(String id) {

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
    public void unsubscribeEmailUser(String id) {

        User user = userRepository.findById(id).get();

        if (user.getIsSubscribed()) {
            user.setIsSubscribed(false);
        }

        userRepository.save(user);
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
