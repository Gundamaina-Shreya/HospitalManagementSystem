package com.hm.hospital.controller;

import com.hm.hospital.repository.UserRepository;
import com.hm.hospital.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hospital.dto.AuthResponseDTO;
import com.hm.hospital.dto.AuthenticationRequestDTO;
import com.hm.hospital.entity.UserEntity;

@RestController
@RequestMapping("/authentication")
public class AuthenticationController 
{
	@Autowired
	private  UserRepository userRepository;
	
	@Autowired
	private  PasswordEncoder passwordEncoder;
	
	@Autowired
	private  AuthenticationManager authenticateManager;
	
	@Autowired
	private  JwtUtil jwtUtil;
	
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody AuthenticationRequestDTO authrequest)
	{
		//check if user already exists
		if(userRepository.findByUsername(authrequest.getUsername()).isPresent())
		{
			return ResponseEntity.ok("Username already Exists");
		}
		
		UserEntity userentity=UserEntity.builder()
				.username(authrequest.getUsername())
				.password(passwordEncoder.encode(authrequest.getPassword()))
				.role(authrequest.getRole()!=null?
						authrequest.getRole():"PATIENT")
				.referenceID(authrequest.getReferenceID())
				.build();
		userRepository.save(userentity);
		return ResponseEntity.ok("User registered Successfully");
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthenticationRequestDTO authrequest)
	{
		authenticateManager .authenticate(
				new UsernamePasswordAuthenticationToken(
						authrequest.getUsername(),
						authrequest.getPassword()));
		
		UserEntity user=userRepository
				.findByUsername(authrequest.getUsername())
				.orElseThrow();
		
		String token=jwtUtil.generateToken(authrequest.getUsername());
		
		return ResponseEntity.ok(
				new AuthResponseDTO(token, user.getRole(), user.getReferenceID(), user.getUsername()));
	}
}
