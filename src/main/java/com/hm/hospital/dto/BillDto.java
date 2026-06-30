package com.hm.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class BillDto 
{
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
	
	private Double discount;
	
	private Double taxPercent;
	
	private Double amountPaid;

	private String paymentMode;


}
