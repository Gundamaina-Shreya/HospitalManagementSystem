package com.hm.hospital.service.impl;


import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hm.hospital.dto.PatientDto;
import com.hm.hospital.entity.PatientEntity;
import com.hm.hospital.entity.UserEntity;
import com.hm.hospital.repository.PatientRepository;
import com.hm.hospital.repository.UserRepository;
import com.hm.hospital.service.PatientService;

@Service
public class PatientServiceImpl implements PatientService 
{

	@Autowired
	private PatientRepository patientRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public PatientEntity patientDetails(PatientDto patientDto) 
	{
		PatientEntity patitnetEntity= PatientEntity.builder()
				.pname(patientDto.getPname())
				.age(patientDto.getAge())
				.gender(patientDto.getGender())
				.bloodGroup(patientDto.getBloodGroup())
				.pno(patientDto.getPno())
				.email(patientDto.getEmail())
				.address(patientDto.getAddress())
				.disease(patientDto.getDisease())
				.status(patientDto.getStatus())
				.admissionDate(LocalDate.now())
				.build();
		
		PatientEntity saved=patientRepository.save(patitnetEntity);
		String username=String.valueOf(patientDto.getPno());
		if(!userRepository.findByUsername(username).isPresent())
		{
			UserEntity user=UserEntity.builder()
					.username(username)
					.password(passwordEncoder.encode(username))
					.role("PATIENT")
					.referenceID(saved.getPid())
					.build();
			userRepository.save(user);
		}
		return saved;
	}

	@Override
	public List<PatientEntity> getAllPatients() 
	{
		return patientRepository.findAll();
	}

	@Override
	public PatientEntity getPatientById(Long id) 
	{
		return patientRepository.findById(id)
				.orElseThrow(()->new RuntimeException("Patient not found with ID: "+id));
	}

	@Override
	public PatientEntity updatePatient(Long id, PatientDto patientDto) 
	{
		PatientEntity patiententity=patientRepository.findById(id)
				.orElseThrow(()-> new RuntimeException("Patient not found with id: "+id));
		
		patiententity.setPname(patientDto.getPname());
		patiententity.setAge(patientDto.getAge());
		patiententity.setGender(patientDto.getGender());
		patiententity.setBloodGroup(patientDto.getBloodGroup());
		patiententity.setPno(patientDto.getPno());
		patiententity.setEmail(patientDto.getEmail());
		patiententity.setAddress(patientDto.getAddress());
		patiententity.setDisease(patientDto.getDisease());
		patiententity.setStatus(patientDto.getStatus());
		
		return patientRepository.save(patiententity);
	}

	@Override
	public void deletePatient(Long id) {
	    if (!patientRepository.existsById(id)) {
	        throw new RuntimeException("Patient not found with id: " + id);
	    } // <-- Close your IF block here!

	    patientRepository.deleteById(id);
	}


	




	
	
	
	

	

}
