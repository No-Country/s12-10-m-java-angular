package com.noCountry.library.controller;

import java.util.List;

import com.noCountry.library.dto.Bill.BillResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.noCountry.library.dto.Bill.BillRequestDto;
import com.noCountry.library.service.impl.BillServiceImpl;

@RestController
@RequestMapping("/bill")
public class BillController {
	@Autowired
	private BillServiceImpl service;

	@PostMapping(path = "/save")
	public ResponseEntity<String> save(@RequestBody BillRequestDto bill) {

		return service.generateBill(bill);
	}
	
	@GetMapping("/list")
	public List<BillResponseDto> getAll() {
		return service.getAll();
	}

	@PutMapping("/delete/{id}")
	public ResponseEntity<String> delete(@PathVariable Long id) {
		return service.logicalDeletionBill(id);
	}


}
