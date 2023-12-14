package com.noCountry.library.dto.Bill;

import java.time.LocalDate;

import lombok.Data;

@Data
public class BillDto {

	private String id;
	private LocalDate dateBill;
	private String userId;
	private Double totalPrice;

}
