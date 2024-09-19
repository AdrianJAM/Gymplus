package com.perfectsystems.gymplus.repository;

import com.perfectsystems.gymplus.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByDni(String dni);

    void deleteByDni(String dni);
    Users findByEmail(String email);

}
