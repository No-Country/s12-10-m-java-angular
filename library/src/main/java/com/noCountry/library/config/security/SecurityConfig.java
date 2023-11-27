package com.noCountry.library.config.security;

import com.noCountry.library.config.security.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private AuthenticationProvider daoAuthProvider;
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

       return http
               .csrf( csrfConfig-> csrfConfig.disable())
               .sessionManagement( sessConfig -> sessConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .authenticationProvider(daoAuthProvider)
               .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
               .authorizeHttpRequests(authRequestConfig -> {
                   authRequestConfig.requestMatchers(HttpMethod.POST,"/authenticate/register").permitAll();
                   authRequestConfig.requestMatchers(HttpMethod.POST,"/authenticate/**").permitAll();


                   authRequestConfig.anyRequest().authenticated();
               })
               .build();

    }

}
