package com.noCountry.library.dto.Bill;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class BillDto {

	private String id;
	private LocalDate dateBill;
	private String userId;
	private Double totalPrice;

}
