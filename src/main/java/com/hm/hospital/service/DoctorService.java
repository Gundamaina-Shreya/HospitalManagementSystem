package com.hm.hospital.service;

import java.util.List;

import com.hm.hospital.dto.DoctorDto;
import com.hm.hospital.entity.DoctorEntity;

public interface DoctorService
{
	public DoctorEntity enterdoctorDetails(DoctorDto doctorDto);
	
	List<DoctorEntity> getAllDoctorDetails();
	
	public DoctorEntity getDoctorDetailsById(Long did);
	
	public DoctorEntity updateDoctorDetails(Long did,DoctorDto doctorDto);
	
	void DeleteDoctorDetails(Long did);
	

	
}
