package com.hm.hospital.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="doctors")
public class DoctorEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long did;

    private String dname;

    private String specialization;

    private String qualification;

    private String email;

    @Column(name="phone_number")
    private Long phone;

    private String experience;

    private String gender;

    @Column(name="consulting_fee")
    private Double consultingFee;

    
    private String status;

    @Column(name="joining_date")
    private LocalDate joiningDate;
}