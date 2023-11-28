package com.noCountry.library.service.auth;

import com.noCountry.library.dto.LoginRequest;
import com.noCountry.library.dto.RegisterRequest;
import com.noCountry.library.dto.UserDetailsResponse;
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
    public UserDetailsResponse registerUser(RegisterRequest newUser) {

        User user = userService.registeUser(newUser);
        String jwt = jwtService.generateToken(user,generateExtraClaims(user));

        UserDetailsResponse userDetailsResponse = UserDetailsResponse.builder()
                .name(user.getName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .jwt(jwt)
                .role(user.getRole().name())
                .list(user.getAuthorities().stream().toList())
                .build();

        return userDetailsResponse;
    }

    private Map<String, Object> generateExtraClaims(User user) {
        Map<String,Object> extraClaims = new HashMap<>();
        extraClaims.put("name",user.getName());
        extraClaims.put("lastName",user.getLastName());
        extraClaims.put("authorities",user.getAuthorities());

        return extraClaims;
    }

    public UserDetailsResponse login(LoginRequest login) {

        Authentication authentication = new UsernamePasswordAuthenticationToken(login.getEmail(),login.getPassword());
        authenticationManager.authenticate(authentication);

        User userDetails = userService.findByEmail(login.getEmail()).get();
        String jwt = jwtService.generateToken(userDetails,generateExtraClaims(userDetails));

        UserDetailsResponse userDetailsResponse = UserDetailsResponse.builder()
                .name(userDetails.getName())
                .lastName(userDetails.getLastName())
                .email(userDetails.getEmail())
                .jwt(jwt)
                .role(userDetails.getRole().name())
                .list(userDetails.getAuthorities().stream().toList())
                .build();

        return userDetailsResponse;

    }

    public User findLoggedInUser() {

        Authentication auth = (UsernamePasswordAuthenticationToken)SecurityContextHolder.getContext().getAuthentication();
            String username = (String)auth.getPrincipal();
            return userService.findByEmail(username).orElseThrow(()-> new NotFoundException("User not found"));

    }
}
