package com.hm.hospital.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="patients")
public class PatientEntity 
{
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	
	private Long pid;
	
	private String pname;
	
	private int age;
	
	private String gender;
	
	@Column(name="blood_group")
	private String bloodGroup;
	
	@Column(name="phone_number")
	private Long pno;
	
	private String email;
	
	private String address;
	
	private String disease;
	
	@Column(name="admission_date")
	private LocalDate admissionDate;
	
	private String status;
	
}
