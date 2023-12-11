package com.noCountry.library.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.noCountry.library.dto.Bill.BillDto;

public interface BillService {

	ResponseEntity<String> generateBill(BillDto billDto);

	ResponseEntity<String> logicalDeletionBill(String id);

	List<BillDto> getAll();
}
