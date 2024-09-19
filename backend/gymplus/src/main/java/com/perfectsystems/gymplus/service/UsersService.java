package com.perfectsystems.gymplus.service;

import com.perfectsystems.gymplus.model.Users;
import com.perfectsystems.gymplus.repository.UsersRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {
    private final UsersRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private UsersService(UsersRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public static UsersService createUsersService(UsersRepository userRepository, PasswordEncoder passwordEncoder) {

        return new UsersService(userRepository, passwordEncoder);

    }

    public List<Users> findAll() {
        return userRepository.findAll();
    }


    public Optional<Users> findById(Long id) {
        return userRepository.findById(id);
    }

    public Users save(Users user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Users findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<Users> findByDni(String dni) {
        return userRepository.findByDni(dni);
    }

    public void deleteByDni(String dni) {
        userRepository.deleteByDni(dni);
    }


}
