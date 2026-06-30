package com.hm.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hm.hospital.entity.PatientEntity;

@Repository
public interface PatientRepository extends JpaRepository<PatientEntity, Long>
{

	
	
}
