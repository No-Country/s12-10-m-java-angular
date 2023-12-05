package com.noCountry.library.controller;

import com.noCountry.library.dto.LoginRequest;
import com.noCountry.library.dto.RegisterRequest;
import com.noCountry.library.dto.UserDetailsDTO;
import com.noCountry.library.entities.User;
import com.noCountry.library.service.auth.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${ALLOWED_ORIGINS}")
@RestController
@RequestMapping("/authenticate")
public class AuthenticateController {

	@Autowired
	private AuthenticationService authenticationService;

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/hello")
    public ResponseEntity<?> hello(){
        return ResponseEntity.status(HttpStatus.OK).body("Hello");
    }

	@PostMapping
	@RequestMapping("/register")
	public ResponseEntity<UserDetailsDTO> registerUser(@RequestBody @Valid RegisterRequest newUser) {
		
		UserDetailsDTO userDetailsDTO = authenticationService.registerUser(newUser);
		return ResponseEntity.status(HttpStatus.CREATED).body(userDetailsDTO);
	}

	@PostMapping("/login")
	public ResponseEntity<UserDetailsDTO> login(@RequestBody @Valid LoginRequest login) {

		UserDetailsDTO userDetailsDTO = authenticationService.login(login);
		return ResponseEntity.status(HttpStatus.OK).body(userDetailsDTO);
	}

	@GetMapping("/profile")
	public ResponseEntity<User> findMyProfile() {
		
		User user = authenticationService.findLoggedInUser();
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}

}
