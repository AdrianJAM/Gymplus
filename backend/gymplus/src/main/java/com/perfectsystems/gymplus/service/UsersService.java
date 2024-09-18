package com.perfectsystems.gymplus.service;

import com.perfectsystems.gymplus.model.Users;
import com.perfectsystems.gymplus.repository.UsersRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersService {
    private final UsersRepository userRepository;

    private UsersService(UsersRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static UsersService createUsersService(UsersRepository userRepository) {
        return new UsersService(userRepository);
    }

    public List<Users> findAll() {
        return userRepository.findAll();
    }


    public Optional<Users> findById(Long id) {
        return userRepository.findById(id);
    }

    
    public Optional<Users> findByDni(String dni) {
        return userRepository.findByDni(dni);
    }

}
