package com.noCountry.library.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noCountry.library.dto.Bill.BillDto;
import com.noCountry.library.service.impl.BillServiceImpl;

@RestController
@RequestMapping("/bill")
public class BillController {
	@Autowired
	private BillServiceImpl service;

	@PostMapping("/save")
	public ResponseEntity<String> save(@RequestBody BillDto bill) {
		return service.generateBill(bill);
	}
	
	@GetMapping("/list")
	public List<BillDto> getAll() {
		return service.getAll();
	}

	@PutMapping("/delete/{id}")
	public ResponseEntity<String> delete(@PathVariable String id) {
		return service.logicalDeletionBill(id);
	}
}
