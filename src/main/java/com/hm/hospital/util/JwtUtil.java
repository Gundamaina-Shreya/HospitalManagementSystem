package com.hm.hospital.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
    private  String SECRET_KEY ;

    private SecretKey getSigningKey()
    {
        return Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes());
    }

    public String generateToken(String username) 
    {
        return Jwts.builder()
            .setSubject(username)        
            .setIssuedAt(new Date(
                System.currentTimeMillis()))
            .setExpiration(new Date(
                System.currentTimeMillis()
                + 1000L * 60 * 60 * 24 * 30))
            .signWith(getSigningKey())
            .compact();
    }

   
    public String extractUsername(String token) 
    {
        return extractClaim(token,
                            Claims::getSubject);
    }

    // Extract expiration
    public Date extractExpiration(String token) 
    {
        return extractClaim(token,
                            Claims::getExpiration);
    }

    //  extract claim
    public <T> T extractClaim(
                    String token,
                    Function<Claims, T> resolver)
    {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }

    
    private Claims extractAllClaims(String token) 
    {
        return Jwts.parserBuilder()          
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    // Check expiry
    private Boolean isTokenExpired(String token) 
    {
        return extractExpiration(token)
                    .before(new Date());
    }

    //Validate token
    public Boolean validateToken(
                    String token,
                    UserDetails userDetails)
    {
        String username = extractUsername(token);
        return (username.equals(
                    userDetails.getUsername())
                && !isTokenExpired(token));
    }
}