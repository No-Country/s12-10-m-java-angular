package com.noCountry.library.service;

import java.util.List;

import com.noCountry.library.dto.Bill.BillResponseDto;
import org.springframework.http.ResponseEntity;

import com.noCountry.library.dto.Bill.BillRequestDto;

public interface BillService {

	ResponseEntity<String> generateBill(BillRequestDto billRequestDto);

	ResponseEntity<String> logicalDeletionBill(Long id);

	List<BillResponseDto> getAll();

}
