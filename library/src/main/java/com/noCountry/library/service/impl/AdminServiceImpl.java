package com.noCountry.library.service.impl;

import com.noCountry.library.entities.User;
import com.noCountry.library.exception.NotFoundException;
import com.noCountry.library.repository.UserRepository;
import com.noCountry.library.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<String> deleteUser(String email) {

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()){
            throw new NotFoundException("Usario no encontrado");
        }
        userRepository.delete(userOptional.get());
        return ResponseEntity.status(HttpStatus.OK).body("Usuario eliminado correctamente");
    }

    @Override
    public ResponseEntity<?> modifyRole(String id) {
        return null;
    }


}
