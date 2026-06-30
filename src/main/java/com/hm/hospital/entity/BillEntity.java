package com.hm.hospital.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillEntity
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	
	private Long billID;
	
	private Long pid;
	
	private String patientName;
	
	private Long did;
	
	private String disease;
	
	private Double consultationFee;
	
	private Double medicineCosts;
	
	private Double roomCharge;
	
	private Integer numOfDays;
	
	private Double labTestsCharge;
	
	private Double nursingCharge;
	
	private Double ambulanceCharge;
	
	private Double otherCharges;
	
	
	private Double subTotal;
	
	private Double discount;
	
	private Double taxPercent;
	
	private Double taxAmount;
	
	private Double totalAmount;
	
	
	private Double amountPaid;
	
	private Double balanceDue;
	
	private String paymentStatus;
	
	private String paymentMode;
	
	@Column(name="created_At")
	private LocalDateTime createdAt;

}
