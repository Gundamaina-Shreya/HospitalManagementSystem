package com.hm.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hospital.dto.AppointmentDto;
import com.hm.hospital.entity.AppointmentEntity;
import com.hm.hospital.service.AppointmentService;

@RestController
@RequestMapping("/appointments")
public class AppointmentController 
{
	@Autowired
	private AppointmentService appointmentService;
	
	@PostMapping
	public ResponseEntity<AppointmentEntity> getAppointment(@RequestBody AppointmentDto appointmentDto)
	{
		AppointmentEntity appointmentEntity=appointmentService.getAppontment(appointmentDto);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(appointmentEntity);
	}
	
	@GetMapping
	public ResponseEntity<List<AppointmentEntity>> getAllAppointmentList()
	{
		return ResponseEntity
				.ok(appointmentService.getAllAppointmentList());
	}
	
	@GetMapping("/{aid}")
	public ResponseEntity<AppointmentEntity> getDetailsByAppointmentId(@PathVariable("aid") Long aid)
	{
		return ResponseEntity
				.ok(appointmentService.getDetailsByAppointmentId(aid));
	}
	
	@GetMapping("/patient/{pid}")
	public ResponseEntity<List<AppointmentEntity>> getAppointmentsByPatient(@PathVariable("pid") Long pid)
	{
		return ResponseEntity.ok(appointmentService.getAppointmentsByPatient(pid));
	}
	
	@GetMapping("/doctor/{did}")
	public ResponseEntity<List<AppointmentEntity>> getAppointmentsByDoctor(@PathVariable("did") Long did)
	{
		return ResponseEntity.ok(appointmentService.getAppointmentsByDoctor(did));
	}
	
	@PutMapping("/{aid}")
	public ResponseEntity<AppointmentEntity> updateAppointment(@PathVariable("aid") Long aid,@RequestBody AppointmentDto appointmentDto)
	{
		return ResponseEntity.ok(appointmentService.updateAppointment(aid, appointmentDto));
	}
	
	@DeleteMapping("/{aid}")
	public ResponseEntity<String> deleteAppointment(@PathVariable("aid") Long aid)
	{
		appointmentService.deleteAppointment(aid);
		return ResponseEntity
				.ok( "Appointment with ID " + aid + " deleted successfully");
	}
	
}
