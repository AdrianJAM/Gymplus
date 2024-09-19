package com.perfectsystems.gymplus.service;

import com.perfectsystems.gymplus.model.Users;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;

@Service
public class JwtService {


    SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String getToken(UserDetails user) {


        return getToken(new HashMap<>(), user);
    }

    private String getToken(HashMap<String, Object> extraClaims, UserDetails user) {

        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis() + 1000 * 60 * 24 * 30))
                .signWith(key).compact();

    };


}
