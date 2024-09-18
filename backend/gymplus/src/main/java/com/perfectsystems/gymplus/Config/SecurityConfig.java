package com.perfectsystems.gymplus.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()  // Desactivar CSRF si no estás usando formularios
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/api/users/**").permitAll()  // Permitir acceso al CRUD de usuarios
                        .anyRequest().authenticated()  // Requiere autenticación para el resto de las rutas
                )
                .httpBasic();  // Autenticación básica

        return http.build();
    }
}
