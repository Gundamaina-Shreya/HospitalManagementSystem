package com.hm.hospital.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hm.hospital.entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long>
{
	 Optional<UserEntity> findByUsername(String username) ;
	
}
