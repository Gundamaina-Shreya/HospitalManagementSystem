package com.hm.hospital.service;

import java.util.List;

import com.hm.hospital.dto.BillDto;
import com.hm.hospital.entity.BillEntity;

public interface BillService 
{
	BillEntity createBill(BillDto billDto);
	
	List<BillEntity> getAllBills();
	
	BillEntity getBillByID(Long billId);
	
	List<BillEntity> getBillByPatientId(Long pid);
	
	BillEntity updatePaymentMethod(Long billId,Double amountPaid);
	
	void deleteBill(Long billId);
}
