package com.noCountry.library.config.security;

import com.noCountry.library.config.security.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private AuthenticationProvider daoAuthProvider;
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    @Value("${ALLOWED_ORIGINS}")
    String allowedOrigin;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

       return http
               .cors(config->config.configurationSource(corsConfigurationSource()))
               .csrf( csrfConfig-> csrfConfig.disable())
               .sessionManagement( sessConfig -> sessConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
               .authenticationProvider(daoAuthProvider)
               .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
               .authorizeHttpRequests(authRequestConfig -> {
                   authRequestConfig.requestMatchers(HttpMethod.POST,"/authenticate/register").permitAll();
                   authRequestConfig.requestMatchers(HttpMethod.POST,"/authenticate/**").permitAll();
                   authRequestConfig.requestMatchers(HttpMethod.GET,"/authenticate/hello").permitAll();
                   authRequestConfig.anyRequest().authenticated();
               })
               .build();

    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*"); //Configuracion de los origenes de la peticion
        configuration.setAllowedMethods(Arrays.asList("*")); //Configuracion de los metodos que van a estar permitidos (GET,POST,etc)
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        configuration.setMaxAge(3600l);
        configuration.setAllowCredentials(true); //Si acepta cookies como session id en caso de usar sesiones o el bearer token

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
