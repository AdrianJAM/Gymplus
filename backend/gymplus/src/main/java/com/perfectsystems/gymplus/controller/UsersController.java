package com.perfectsystems.gymplus.controller;

import com.perfectsystems.gymplus.Exception.ResourceNotFoundException;
import com.perfectsystems.gymplus.model.Users;
import com.perfectsystems.gymplus.repository.UsersRepository;
import com.perfectsystems.gymplus.service.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("api/user")
public class UsersController {

    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @GetMapping("/dni/{dni}")
    public ResponseEntity<Users> getUsersByDni(@PathVariable("dni") String dni) {
        Users user = usersService.findByDni(dni)
                .orElseThrow(() -> new ResourceNotFoundException("User with DNI: " + dni + " not found"));
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @PostMapping
    public Users createUser(@RequestBody Users user) {
        return usersService.save(user);
    }

    @PutMapping("/dni/{dni}")
    public ResponseEntity<Users> updateUser(@PathVariable("dni") String dni, @RequestBody Users user) {
        Optional<Users> userOptional = usersService.findByDni(dni);
        if (userOptional.isPresent()) {

            Users existingUser = userOptional.get();
            existingUser.setDni(user.getDni());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            return new ResponseEntity<>(usersService.save(existingUser), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/dni/{dni}")
    public ResponseEntity<Users> deleteUser(@PathVariable("dni") String dni) {
        try {
            usersService.deleteByDni(dni);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}

