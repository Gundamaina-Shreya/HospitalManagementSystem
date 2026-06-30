package com.hm.hospital.service.impl;

import com.hm.hospital.repository.DoctorRepository;
import com.hm.hospital.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hm.hospital.dto.DoctorDto;
import com.hm.hospital.entity.DoctorEntity;
import com.hm.hospital.entity.UserEntity;
import com.hm.hospital.service.DoctorService;

@Service
public class DoctorServiceImpl implements DoctorService
{

	@Autowired
	private  DoctorRepository doctorRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	

	@Override
	public DoctorEntity enterdoctorDetails(DoctorDto doctorDto)
	{
		DoctorEntity doctorEntity=DoctorEntity.builder()
				.dname(doctorDto.getDname())
				.specialization(doctorDto.getSpecialization())
				.qualification(doctorDto.getQualification())
				.email(doctorDto.getEmail())
				.phone(doctorDto.getPhone())
				.experience(doctorDto.getExperience())
				.gender(doctorDto.getGender())
				.consultingFee(doctorDto.getConsultingFee())
				.status(doctorDto.getStatus())
				.joiningDate(LocalDate.now())
				.build();
				
		DoctorEntity saved=doctorRepository.save(doctorEntity);
		
		String username=doctorDto.getEmail();
		String password=String.valueOf(doctorDto.getPhone());
		
		if(!userRepository.findByUsername(username).isPresent())
		{
			UserEntity user=UserEntity.builder()
					.username(username)
					.password(passwordEncoder.encode(password))
					.role("DOCTOR")
					.referenceID(saved.getDid())
					.build();
			userRepository.save(user);

		}
		return saved;
	}


	@Override
	public DoctorEntity getDoctorDetailsById(Long did)
	{
		return doctorRepository.findById(did)
				.orElseThrow(()->new RuntimeException("No Details found"));
	}

	@Override
	public List<DoctorEntity> getAllDoctorDetails() 
	{
		return doctorRepository.findAll();
	}




	@Override
	public DoctorEntity updateDoctorDetails(Long did,DoctorDto doctorDto)
	{
		DoctorEntity doctorEntity=doctorRepository.findById(did)
				.orElseThrow(()->new RuntimeException("No Details found "+did));
		
		doctorEntity.setDname(doctorDto.getDname());
		doctorEntity.setSpecialization(doctorDto.getSpecialization());
		doctorEntity.setQualification(doctorDto.getQualification());
		doctorEntity.setEmail(doctorDto.getEmail());
		doctorEntity.setPhone(doctorDto.getPhone());
		doctorEntity.setExperience(doctorDto.getExperience());
		doctorEntity.setStatus(doctorDto.getStatus());
		
		return doctorRepository.save(doctorEntity);
	}



	@Override
	public void DeleteDoctorDetails(Long did) 
	{
		if(!doctorRepository.existsById(did))
		{
			throw new RuntimeException("Doctor not found with ID: "+did);
		}
		doctorRepository.deleteById(did);
		
	}


	
	


	
	
	
	
	
	
	
	
}
