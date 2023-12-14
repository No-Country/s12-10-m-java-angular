package com.noCountry.library.dto.Bill;

import java.util.Map;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BillRequestDto {

	@NotBlank(message = "Este campo es obligatorio")
	private String userId;

	@NotBlank(message = "Este campo es obligatorio")
	private Map<String, Integer> bookQuantities;
	// Relacion: <IdBook, Quantities>

}
