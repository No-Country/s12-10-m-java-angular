package com.noCountry.library.controller;

import com.noCountry.library.dto.LoginRequest;
import com.noCountry.library.dto.LoginResponse;
import com.noCountry.library.dto.RegisterRequest;
import com.noCountry.library.dto.RegisterResponse;
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
    public ResponseEntity<RegisterResponse> registerUser (@RequestBody @Valid RegisterRequest newUser){
        RegisterResponse registerResponse = authenticationService.registerUser(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(registerResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login (@RequestBody @Valid LoginRequest login){

        LoginResponse loginResponse = authenticationService.login(login);

        return null;
    }

}
