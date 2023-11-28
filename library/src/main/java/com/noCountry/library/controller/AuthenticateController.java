package com.noCountry.library.controller;

import com.noCountry.library.dto.LoginRequest;
import com.noCountry.library.dto.RegisterRequest;
import com.noCountry.library.dto.UserDetailsResponse;
import com.noCountry.library.entities.User;
import com.noCountry.library.service.auth.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authenticate")
public class AuthenticateController {

    @Autowired
    private AuthenticationService authenticationService;

    @GetMapping("/hello")
    public ResponseEntity<?> hello(){
        return ResponseEntity.status(HttpStatus.OK).body("Hello");

    }

    @PostMapping
    @RequestMapping("/register")
    public ResponseEntity<UserDetailsResponse> registerUser (@RequestBody @Valid RegisterRequest newUser){
        UserDetailsResponse userDetailsResponse = authenticationService.registerUser(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(userDetailsResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDetailsResponse> login (@RequestBody @Valid LoginRequest login){

        UserDetailsResponse loginResponse = authenticationService.login(login);

        return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> findMyProfile(){
        User user = authenticationService.findLoggedInUser();
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

}
