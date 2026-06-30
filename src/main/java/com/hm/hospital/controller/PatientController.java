package com.hm.hospital.controller;

import com.hm.hospital.repository.PatientRepository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hospital.dto.PatientDto;
import com.hm.hospital.entity.PatientEntity;
import com.hm.hospital.service.PatientService;

@RestController
@RequestMapping("/patients")
public class PatientController
{
	@Autowired
	private PatientService patientService;
	
	@Autowired
	private PatientRepository patientRepository;

	
	PatientController(PatientRepository patientRepository) {
		this.patientRepository = patientRepository;
	}
	@PostMapping
	public ResponseEntity<PatientEntity> patientDetails(@RequestBody PatientDto patientDto)
	{
		PatientEntity patientEntity=patientService.patientDetails(patientDto);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(patientEntity);
	}
	
	@GetMapping
	public ResponseEntity<List<PatientEntity>> getAllPatients()
	{
		List<PatientEntity> patients=patientService.getAllPatients();
		return ResponseEntity.ok(patients);		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<PatientEntity> getPatientById(@PathVariable("id") Long id)
	{
		PatientEntity patientEntity=patientService.getPatientById(id);
		return ResponseEntity.ok(patientEntity);
	}
	@PutMapping("/{id}")
	public ResponseEntity<PatientEntity> updatePatient(@PathVariable ("id")Long id,@RequestBody PatientDto patientDto)
	{
		PatientEntity updatePatient=patientService.updatePatient(id, patientDto);
		return ResponseEntity.ok(updatePatient);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletePatient(@PathVariable("id") Long id)
	{
		patientService.deletePatient(id);
        return ResponseEntity.ok("Patient with ID " + id + " deleted successfully");
		
	}
	
	
   

	
	
}
