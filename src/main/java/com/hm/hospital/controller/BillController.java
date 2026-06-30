package com.hm.hospital.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hm.hospital.dto.BillDto;
import com.hm.hospital.entity.BillEntity;
import com.hm.hospital.service.BillService;

@RestController
@RequestMapping("/bills")
public class BillController 
{
	@Autowired
	private BillService billService;
	
	@PostMapping
	public ResponseEntity<BillEntity> createBill(@RequestBody BillDto billDto)
	{
		BillEntity createBill=billService.createBill(billDto);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(createBill);
	}
	
	
	@GetMapping("/{billId}")
	public ResponseEntity<BillEntity> getBillById(@PathVariable("billId") Long billId)
	{
		BillEntity bill=billService.getBillByID(billId);
		return ResponseEntity.ok(bill);
	}
	
	@GetMapping("/patients/{pid}")
	public ResponseEntity<List<BillEntity>> getBillByPatientId(@PathVariable("pid") long pid)
	{
		List<BillEntity> bills=billService.getBillByPatientId(pid);
		return ResponseEntity.ok(bills);
	}
	
	@PutMapping("/{billId}/payment")
	public ResponseEntity<BillEntity> updatePayment(@PathVariable("billId") Long billId,@RequestParam("amountPaid") Double amountPaid)
	{
		BillEntity updatedBill=billService.updatePaymentMethod(billId, amountPaid);
		return ResponseEntity.ok(updatedBill);
	}
	
	@DeleteMapping("/{billId}")
	public ResponseEntity<String> deleteBill(@PathVariable("billId") long billId)
	{
		billService.deleteBill(billId);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body("Bill With Id "+billId+" Deleted Successfully");
	}
}
