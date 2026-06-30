package com.hm.hospital.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientDto 
{
	private Long pid;
	

	private String pname;
	
	private int age;
	
	private String gender;
	
	private String bloodGroup;
	
	private Long pno;
	
	private String email;
	
	private String password;
	
	private String address;
	
	private String disease;
	
	private LocalDate admissionDate;
	
	private String status;
	
}

