package com.noCountry.library.dto.Bill;

import java.util.Map;

import com.noCountry.library.entities.enums.PaymentMethods;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BillRequestDto {

	@NotBlank(message = "Este campo es obligatorio")
	private String userId;

	@NotBlank(message = "Este campo es obligatorio")
	private Boolean delivery;

	@NotBlank(message = "Este campo es obligatorio")
	private String paymentMethods;

	private String address;

	@NotBlank(message = "Este campo es obligatorio")
	private Map<String, Integer> bookQuantities;
	// Relacion: <IdBook, Quantities>

}
