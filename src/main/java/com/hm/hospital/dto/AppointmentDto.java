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
public class AppointmentDto 
{

    private Long aid;

    private Long pid;

    private Long did;

    private String pname;

    private String dname;

    private String specialization;

    private LocalDate appointmentDate;

    private String timeSlot;

    private String reason;

    private String status;
}
