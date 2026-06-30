package com.hm.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDTO 
{
	private String token;
	private String role;
	private Long referenceId;
	private String username;
}
