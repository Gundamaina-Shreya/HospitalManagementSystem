package com.hm.hospital.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hm.hospital.entity.AppointmentEntity;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Long>
{

	List<AppointmentEntity> findByPid(Long pid);

	List<AppointmentEntity> findByDid(Long did);

}
