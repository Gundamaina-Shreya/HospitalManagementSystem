package com.hm.hospital.dto;

import lombok.Data;

@Data
public class AuthenticationRequestDTO 
{
	private String username;
	private String password;
	private String role;
	private Long referenceID;
}
