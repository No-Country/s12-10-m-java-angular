package com.noCountry.library.service.auth;

import com.noCountry.library.dto.LoginRequest;
import com.noCountry.library.dto.LoginResponse;
import com.noCountry.library.dto.RegisterRequest;
import com.noCountry.library.dto.RegisterResponse;
import com.noCountry.library.entities.User;
import com.noCountry.library.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
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
    public RegisterResponse registerUser(RegisterRequest newUser) {

        User user = userService.registeUser(newUser);
        String jwt = jwtService.generateToken(user,generateExtraClaims(user));

        RegisterResponse registerResponse = RegisterResponse.builder()
                .name(user.getName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .jwt(jwt)
                .role(user.getRole().name())
                .list(user.getAuthorities().stream().toList())
                .build();

        return registerResponse;
    }

    private Map<String, Object> generateExtraClaims(User user) {
        Map<String,Object> extraClaims = new HashMap<>();
        extraClaims.put("name",user.getName());
        extraClaims.put("lastName",user.getLastName());
        extraClaims.put("authorities",user.getAuthorities());

        return extraClaims;
    }

    public LoginResponse login(LoginRequest login) {

        Authentication authentication = new UsernamePasswordAuthenticationToken(login.getEmail(),login.getPassword());
        authenticationManager.authenticate(authentication);

        UserDetails userDetails = userService.findByEmail(login.getEmail()).get();
        String jwt = jwtService.generateToken(userDetails,generateExtraClaims((User) userDetails));
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setJwt(jwt);
        return loginResponse;

    }
}
