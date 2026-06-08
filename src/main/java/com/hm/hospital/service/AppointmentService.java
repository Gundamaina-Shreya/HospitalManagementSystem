package com.hm.hospital.service;

import java.util.List;

import com.hm.hospital.dto.AppointmentDto;
import com.hm.hospital.entity.AppointmentEntity;

public interface AppointmentService 
{
	public AppointmentEntity getAppontment(AppointmentDto appointmentDto);
	
	List<AppointmentEntity> getAllAppointmentList();
	
	public AppointmentEntity getDetailsByAppointmentId(Long aid);
	
	List<AppointmentEntity> getAppointmentsByPatient(Long pid);
	
    List<AppointmentEntity> getAppointmentsByDoctor( Long did);
    
    AppointmentEntity updateAppointment(Long aid, AppointmentDto appointmentDto);
    
    void deleteAppointment(Long aid);
}
