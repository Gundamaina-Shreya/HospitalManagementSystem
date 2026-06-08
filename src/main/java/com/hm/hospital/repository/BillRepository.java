package com.hm.hospital.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hm.hospital.entity.BillEntity;

@Repository
public interface BillRepository extends JpaRepository<BillEntity, Long>
{

	List<BillEntity> findByPid(Long pid);

}
