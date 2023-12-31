package com.noCountry.library.service.auth;

import com.noCountry.library.dto.auth.LoginRequest;
import com.noCountry.library.dto.auth.RegisterRequest;
import com.noCountry.library.dto.auth.UserDetailsDTO;
import com.noCountry.library.entities.User;
import com.noCountry.library.exception.NotFoundException;
import com.noCountry.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {

	@Autowired
	private UserService userService;
	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationManager authenticationManager;

	public UserDetailsDTO registerUser(RegisterRequest newUser) {

		User user = userService.registeUser(newUser);
		String jwt = jwtService.generateToken(user, generateExtraClaims(user));

		UserDetailsDTO userDetailsDTO = UserDetailsDTO.builder().id(user.getId()).name(user.getName()).lastName(user.getLastName())
				.email(user.getEmail()).jwt(jwt).role(user.getRole().name())
				.list(user.getAuthorities().stream().toList()).build();

		return userDetailsDTO;
	}

	private Map<String, Object> generateExtraClaims(User user) {
		
		Map<String, Object> extraClaims = new HashMap<>();
		extraClaims.put("name", user.getName());
		extraClaims.put("lastName", user.getLastName());
		extraClaims.put("authorities", user.getAuthorities());

		return extraClaims;
	}

	public UserDetailsDTO login(LoginRequest login) {

		Authentication authentication = new UsernamePasswordAuthenticationToken(login.getEmail(), login.getPassword());
		authenticationManager.authenticate(authentication);

		User userDetails = userService.findByEmail(login.getEmail()).get();
		String jwt = jwtService.generateToken(userDetails, generateExtraClaims(userDetails));

		UserDetailsDTO userDetailsDTO = UserDetailsDTO.builder().id(userDetails.getId()).name(userDetails.getName())
				.lastName(userDetails.getLastName()).email(userDetails.getEmail()).jwt(jwt)
				.role(userDetails.getRole().name()).list(userDetails.getAuthorities().stream().toList()).build();

		return userDetailsDTO;
	}


	public User findLoggedInUser() {

		Authentication auth = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext()
				.getAuthentication();
		String username = (String) auth.getPrincipal();
		return userService.findByEmail(username).orElseThrow(() -> new NotFoundException("User not found"));

	}

	public UserDetailsDTO findUser() {

		Authentication auth = (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext()
				.getAuthentication();

		String username = (String) auth.getPrincipal();
		User userDetails = userService.findByEmail(username).get();

		String jwt = jwtService.generateToken(userDetails, generateExtraClaims(userDetails));

		UserDetailsDTO userDetailsDTO = UserDetailsDTO.builder().id(userDetails.getId()).name(userDetails.getName())
				.lastName(userDetails.getLastName()).email(userDetails.getEmail()).jwt(jwt)
				.role(userDetails.getRole().name()).list(userDetails.getAuthorities().stream().toList()).build();

		return userDetailsDTO;

	}


}
