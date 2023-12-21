package com.noCountry.library.dto.Bill;

import com.noCountry.library.entities.enums.PaymentMethods;
import lombok.Data;

import java.time.LocalDate;
import java.util.Map;

@Data
public class BillResponseDto {

    private Long id;
    private Double totalPrice;
    private LocalDate dateBill;
    private String paymentMethods;
    private String address;
    private Boolean delivery;
    private String userId;
    private Map<String, Integer> billItems;

}
