package com.hm.hospital.service.impl;

import java.time.LocalDate;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.hospital.dto.AppointmentDto;
import com.hm.hospital.entity.AppointmentEntity;
import com.hm.hospital.repository.AppointmentRepository;
import com.hm.hospital.service.AppointmentService;

@Service
public class AppointmentServiceImpl implements AppointmentService
{
	
	@Autowired
	private AppointmentRepository appointmentRepository;

	

	@Override
	public AppointmentEntity getAppontment(AppointmentDto appointmentDto)
	{
		AppointmentEntity appointmentEntity=AppointmentEntity.builder()
				.aid(appointmentDto.getAid())
				.pid(appointmentDto.getPid())
				.did(appointmentDto.getDid())
				.pname(appointmentDto.getPname())
				.dname(appointmentDto.getDname())
				.specialization(appointmentDto.getSpecialization())
				.appointmentDate(LocalDate.now())
				.timeSlot(appointmentDto.getTimeSlot())
				.reason(appointmentDto.getReason())
				.status(appointmentDto.getStatus())
				.build();
		return appointmentRepository.save(appointmentEntity);
	}

	@Override
	public List<AppointmentEntity> getAllAppointmentList() 
	{
		return appointmentRepository.findAll();
	}

	@Override
	public AppointmentEntity getDetailsByAppointmentId(Long aid) 
	{
		return appointmentRepository.findById(aid)
				.orElseThrow(()->new RuntimeException( "No Appointment with ID: "+aid));
	}

	@Override
	public List<AppointmentEntity> getAppointmentsByPatient(Long pid) 
	{
		return appointmentRepository.findByPid(pid);	
	}

	@Override
	public List<AppointmentEntity> getAppointmentsByDoctor(Long did) 
	{
		return appointmentRepository.findByDid(did);
	}

	@Override
	public AppointmentEntity updateAppointment(Long aid, AppointmentDto appointmentDto) 
	{
		AppointmentEntity appointmentEntity=appointmentRepository.findById(aid)
				.orElseThrow(()->new RuntimeException("No Appintment with ID: "+aid));
		
		appointmentEntity.setPid(appointmentDto.getPid());
		appointmentEntity.setDid(appointmentDto.getDid());
		appointmentEntity.setPname(appointmentDto.getPname());
		appointmentEntity.setDname(appointmentDto.getDname());
		appointmentEntity.setSpecialization(appointmentDto.getSpecialization());
		appointmentEntity.setAppointmentDate(appointmentDto.getAppointmentDate());
		appointmentEntity.setTimeSlot(appointmentDto.getTimeSlot());
		appointmentEntity.setReason(appointmentDto.getReason());
		appointmentEntity.setStatus(appointmentDto.getStatus());
		
		return appointmentRepository.save(appointmentEntity);
	}

	@Override
	public void deleteAppointment(Long aid) 
	{
		if(!appointmentRepository.existsById(aid))
		{
			 throw new RuntimeException( "Appointment not found with ID: "+ aid); 
		}
		appointmentRepository.deleteById(aid);
	}
	
	
	
	
	
	
	
	
}
