package com.hm.hospital.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hm.hospital.dto.BillDto;
import com.hm.hospital.entity.BillEntity;
import com.hm.hospital.repository.BillRepository;
import com.hm.hospital.service.BillService;

@Service
public class BillServiceImpl implements BillService
{
	@Autowired
	private BillRepository billRepository;

	@Override
	public BillEntity createBill(BillDto billDto) 
	{
		//Adding all the Charges
		Double consultationFee=
				Bill(billDto.getConsultationFee());
		
		Double medicationCost=
				Bill(billDto.getMedicineCosts());
		
		//Room charges*  days if room is alloted
		
		Double roomCharge=
				Bill(billDto.getRoomCharge())
				*(billDto.getNumOfDays()!=null
				? billDto.getNumOfDays():1);
		
		Double labTest=
				Bill(billDto.getLabTestsCharge());
		
		Double nursingCharge=
				Bill(billDto.getNursingCharge());
		
		//Ambulance Charges if used 
		Double ambulanceCharge=
				Bill(billDto.getAmbulanceCharge());
		
		Double otherCharges=
				Bill(billDto.getAmbulanceCharge());
		
		//Calculating Sub-Total Amount
		Double subTotal=consultationFee
				+medicationCost
				+roomCharge
				+labTest
				+nursingCharge
				+ambulanceCharge
				+otherCharges;
		
		//Applying Discount
		
		Double discount=
				Bill(billDto.getDiscount());
		
		Double afterDiscount=subTotal-discount;
		
		//Tax calculation
		
		Double taxPercent=
				Bill(billDto.getTaxPercent());
		
		Double taxAmount=
				(afterDiscount*taxPercent)/100;
		
		//Total Amount
		Double totalAmount=
				afterDiscount+taxAmount;
		
		//Balance AMount
		Double amountPaid=
				Bill(billDto.getAmountPaid());
		
		Double balanceDue=
				totalAmount-amountPaid;
		
		if(balanceDue<0)
		{
			balanceDue=0.0;
		}
		//payment Status
		String paymentStatus;
		if(balanceDue<=0)
		{
			paymentStatus="PAID";
		}
		else if(amountPaid>0)
		{
			paymentStatus="PARTIALLY_PAID";
		}
		else
		{
			paymentStatus="UNPAID";
		}
				
		//Build and Save
		BillEntity billEntity=BillEntity.builder()
				
				.pid(billDto.getPid())
				.patientName(billDto.getPatientName())
				.doctorName(billDto.getDoctorName())
				.disease(billDto.getDisease())
				.consultationFee(billDto.getConsultationFee())
				.medicineCosts(billDto.getMedicineCosts())
				.roomCharge(billDto.getRoomCharge())
				.labTestsCharge(billDto.getLabTestsCharge())
				.nursingCharge(billDto.getNursingCharge())
				.ambulanceCharge(billDto.getAmbulanceCharge())
				.otherCharges(otherCharges)
				.subTotal(subTotal)
				.discount(discount)
				.taxPercent(taxPercent)
				.taxAmount(taxAmount)
				.totalAmount(totalAmount)
				.amountPaid(amountPaid)
				.balanceDue(balanceDue)
				.paymentStatus(paymentStatus)
				.paymentMode(billDto.getPaymentMode())
				.createdAt(LocalDateTime.now())
				.build();
		
		
		
		
		return billRepository.save(billEntity);
	}

	private Double Bill(Double value) 
	{
		return value !=null ? value : 0.0;
	}

	@Override
	public List<BillEntity> getAllBills()
	{
		return billRepository.findAll();
	}

	@Override
	public BillEntity getBillByID(Long billId) {
	    return billRepository.findById(billId)
	            .orElseThrow(() -> new RuntimeException("Bill not Found with the Id: " + billId));
	}


	@Override
	public List<BillEntity> getBillByPatientId(Long pid) 
	{
		
		return billRepository.findByPid(pid);
	}

	@Override
	public BillEntity updatePaymentMethod(Long billId, Double amountPaid)
	{
		BillEntity bill=getBillByID(billId);
		
		Double newAmountPaid=
				bill.getAmountPaid()+amountPaid;
		
		Double newBalanceDue=
				bill.getTotalAmount()-newAmountPaid;
		
		bill.setAmountPaid(newAmountPaid);
		bill.setBalanceDue(newBalanceDue);
		
		if(newBalanceDue<=0)
		{
			bill.setPaymentStatus("PAID");
		}
		else
		{
			bill.setPaymentStatus("PENDING");
		}
		return billRepository.save(bill);
	}

	@Override
	public void deleteBill(Long billId)
	{
		billRepository.deleteById(billId);
	}
	
	
	
	
	
	
	
	
}
