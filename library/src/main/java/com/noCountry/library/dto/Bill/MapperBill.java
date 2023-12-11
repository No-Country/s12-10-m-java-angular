package com.noCountry.library.dto.Bill;

import org.springframework.stereotype.Component;

import com.noCountry.library.entities.Bill;

@Component
public class MapperBill {

	public Bill billDtoToBill(BillDto billDto) {
		Bill bill = new Bill();
		bill.setId(billDto.getId());
		bill.setDateBill(billDto.getDateBill());
		bill.setTotalPrice(billDto.getTotalPrice());
		
		return bill;
	}
	
	public BillDto billToBillDto (Bill bill) {
		BillDto billDto = new BillDto();
		
		billDto.setId(bill.getId());
		billDto.setDateBill(bill.getDateBill());
		billDto.setTotalPrice(bill.getTotalPrice());
		
		return billDto;
	}

}
