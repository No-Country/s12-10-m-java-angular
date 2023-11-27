package com.noCountry.library.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private AuthenticationProvider daoAuthProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

       return http
               .csrf( csrfConfig-> csrfConfig.disable())
               .sessionManagement( sessConfig -> sessConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .authenticationProvider(daoAuthProvider)
               .authorizeHttpRequests(authRequestConfig -> {
                   authRequestConfig.requestMatchers(HttpMethod.POST,"/authenticate/register").permitAll();
                   authRequestConfig.requestMatchers(HttpMethod.GET,"/authenticate/**").permitAll();


                   authRequestConfig.anyRequest().authenticated();
               })
               .build();

    }

}
