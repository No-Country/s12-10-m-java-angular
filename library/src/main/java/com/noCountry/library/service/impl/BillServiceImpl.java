package com.noCountry.library.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.noCountry.library.dto.Bill.BillDto;
import com.noCountry.library.dto.Bill.MapperBill;
import com.noCountry.library.entities.Bill;
import com.noCountry.library.exception.BadRequestException;
import com.noCountry.library.repository.BillRepository;
import com.noCountry.library.service.BillService;

@Service
public class BillServiceImpl implements BillService {

	@Autowired
	private BillRepository billRepository;
	@Autowired
	private MapperBill mapperBill;

	@Override
	public ResponseEntity<String> generateBill(BillDto billDto) {
		ResponseEntity<String> response = null;
		Optional<Bill> billOptional = billRepository.findById(billDto.getId());
		try {
			if (billOptional.isPresent()) {
				throw new BadRequestException("the bill already exists");
			}
			Bill bill = mapperBill.billDtoToBill(billDto);
			bill.setStatus(Boolean.TRUE);
			bill.setDateBill(LocalDate.now());
			billRepository.save(bill);
			response = ResponseEntity.ok("Bill added successfully");
		} catch (Exception e) {
			e.printStackTrace();
			response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add bill");
		}
		return response;
	}

	@Override
	public List<BillDto> getAll() {
		List<Bill> list = new ArrayList<>();
		try {
			list = billRepository.findByStatusTrue();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list.stream().map(mapperBill::billToBillDto).collect(Collectors.toList());
	}

	@Override
	public ResponseEntity<String> logicalDeletionBill(String id) {
		ResponseEntity<String> response = null;
		Optional<Bill> bill = billRepository.findById(id);
		try {
			if (bill.isPresent()) {
				Bill deleteBill = bill.get();
				deleteBill.setStatus(Boolean.FALSE);
				billRepository.save(deleteBill);
				response = ResponseEntity.ok("Bill with ID " + id + " logically removed successfully");
			} else {
				response = ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bill with ID " + id + " not found");
			}
		} catch (Exception e) {
			e.printStackTrace();
			response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to delete author with ID " + id);
		}
		return response;
	}
}
