package com.hm.hospital.dto;


import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DoctorDto 
{

    private Long did;

    private String dname;

    private String specialization;

    private String qualification;

    private String email;

    private Long phone;

    private String experience;

    private String gender;

    private Double consultingFee;

    private String status;

    private LocalDate joiningDate;
}