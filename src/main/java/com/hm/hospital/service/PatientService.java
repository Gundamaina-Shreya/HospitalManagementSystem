package com.hm.hospital.service;


import java.util.List;

import com.hm.hospital.dto.PatientDto;
import com.hm.hospital.entity.PatientEntity;

public interface PatientService 
{
	
	PatientEntity patientDetails(PatientDto patientDto);
	
	List<PatientEntity>getAllPatients();
	
	PatientEntity getPatientById(Long id);
	
	PatientEntity updatePatient(Long id,PatientDto patientDto);
	
	void  deletePatient(Long id);
	
}
