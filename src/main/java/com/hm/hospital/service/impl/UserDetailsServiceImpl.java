package com.hm.hospital.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hm.hospital.entity.UserEntity;
import com.hm.hospital.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService
{
	@Autowired
	private UserRepository userRepositoty;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException 
	{
		UserEntity user=userRepositoty
				.findByUsername(username)
				.orElseThrow(()->new UsernameNotFoundException("User not found: "+username));
		
		  return User.builder()
		            .username(user.getUsername())
		            .password(user.getPassword())
		            .roles(user.getRole())
		            .build();
	}
}
