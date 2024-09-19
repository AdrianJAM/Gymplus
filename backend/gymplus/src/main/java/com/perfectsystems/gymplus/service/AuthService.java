package com.perfectsystems.gymplus.service;

import com.perfectsystems.gymplus.dto.JwtAuthenticationResponse;
import com.perfectsystems.gymplus.dto.LoginRequest;
import com.perfectsystems.gymplus.dto.RegisterRequest;
import com.perfectsystems.gymplus.model.Role;
import com.perfectsystems.gymplus.model.Users;
import com.perfectsystems.gymplus.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final UsersRepository usersRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationResponse login(LoginRequest loginRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        UserDetails user = usersRepository.findByEmail(loginRequest.getEmail());
        String token = jwtService.getToken(user);
        return new JwtAuthenticationResponse(token);
    }

    public JwtAuthenticationResponse register(RegisterRequest registerRequest) {
        Users user = Users.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .phone(registerRequest.getPhone())
                .role(Role.USER)
                .build();
        usersRepository.save(user);
        return JwtAuthenticationResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }

}
