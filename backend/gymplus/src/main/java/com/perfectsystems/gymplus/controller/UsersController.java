package com.perfectsystems.gymplus.controller;

import com.perfectsystems.gymplus.model.Users;
import com.perfectsystems.gymplus.model.Users;
import com.perfectsystems.gymplus.repository.UsersRepository;
import com.perfectsystems.gymplus.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("public/api/user")
public class UsersController {

    @Autowired

    private UsersService usersService;
    @Autowired
    private UsersRepository usersRepository;


    @GetMapping("/dni/{dni}")
    public ResponseEntity<Users> getUsersByDni(@PathVariable("dni") String dni) {
        Optional<Users> user = usersService.findByDni(dni);

        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());

    }

    @PostMapping
    public Users createUser(@RequestBody Users user) {
        return usersRepository.save(user);
    }

    @PutMapping("/dni/{dni}")
    public ResponseEntity<Users> updateUser(@PathVariable("dni") String dni, @RequestBody Users user) {
        Optional<Users> userOptional = usersService.findByDni(dni);
        if (userOptional.isPresent()) {

            Users existinguser = userOptional.get();
            existinguser.setDni(user.getDni());
            existinguser.setEmail(user.getEmail());
            existinguser.setPassword(user.getPassword());
            return new ResponseEntity<>(usersRepository.save(existinguser), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/dni/{dni}")
    public ResponseEntity<Users> deleteUser(@PathVariable("dni") String dni) {
        try {
            usersRepository.deleteByDni(dni);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}

