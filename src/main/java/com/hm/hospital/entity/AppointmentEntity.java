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
@Table(name="appointments")
public class AppointmentEntity 
{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    
    private Long aid;

    private Long pid;  
    
    private Long did;        

    private String pname;    

    private String dname;    

    private String specialization; // doctor specialization

    @Column(name="appointment_date")
    private LocalDate appointmentDate;

    private String timeSlot; // "10:00 AM"

    private String reason;   // reason for visit

    // BOOKED / COMPLETED / CANCELLED
    private String status;

    @Column(name="created_at")
    private LocalDate createdAt;
}