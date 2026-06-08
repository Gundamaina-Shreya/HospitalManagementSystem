package com.hm.hospital.controller;

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

import com.hm.hospital.dto.DoctorDto;
import com.hm.hospital.entity.DoctorEntity;
import com.hm.hospital.service.DoctorService;


@RestController
@RequestMapping("/doctors")
public class DoctorController 
{
	@Autowired
	private DoctorService doctorService;
	
	@PostMapping
	public ResponseEntity<DoctorEntity> doctorDetails(@RequestBody DoctorDto doctorDto)
	{
		DoctorEntity doctorEntity=doctorService.enterdoctorDetails(doctorDto);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(doctorEntity);
	}
	
	
	@GetMapping("/{did}")
	public ResponseEntity<DoctorEntity> getdocDetailsById(@PathVariable("did")Long did)
	{
		DoctorEntity doctorEntity=doctorService.getDoctorDetailsById(did);
		return ResponseEntity.ok(doctorEntity);
	}
	
	@GetMapping
	public ResponseEntity<List<DoctorEntity>> getDoctorDetails()
	{
		List<DoctorEntity> doctorEntity=doctorService.getAllDoctorDetails();
		return ResponseEntity.ok(doctorEntity);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<DoctorEntity> updateDocDetails(@PathVariable("id") Long did, @RequestBody DoctorDto doctorDto)
	{
	    DoctorEntity doctorEntity = doctorService.updateDoctorDetails(did, doctorDto);
	    return ResponseEntity.ok(doctorEntity);			
	}
	
	@DeleteMapping("/{did}")
	public ResponseEntity<String> deletePatient(@PathVariable("did") Long did)
	{
		doctorService.DeleteDoctorDetails(did);
		return ResponseEntity.ok("Doctor with Id: "+did+" Details Deleted Successfully");
	}
	
	
	
	
}
