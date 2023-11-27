package com.noCountry.library.controller;

import com.noCountry.library.dto.Register;
import com.noCountry.library.entities.User;
import com.noCountry.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UserController {


    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/user")
    public ResponseEntity<?> saveUser(@RequestBody Register user) {
        User users = userService.createUser(user);
        return ResponseEntity.ok(users);
    }

    @GetMapping(path = "/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable UUID id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }


    @DeleteMapping(path = "/user/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable UUID id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping(path = "/user/unsubscribe/{id}")
    public ResponseEntity<?> unsubscribeEmailUser(@PathVariable UUID id) throws Exception {
        try {
            userService.unsubscribeEmailUser(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }



}
