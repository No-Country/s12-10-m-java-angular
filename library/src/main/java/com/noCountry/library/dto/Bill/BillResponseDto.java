package com.noCountry.library.dto.Bill;

import lombok.Data;

import java.time.LocalDate;
import java.util.Map;

@Data
public class BillResponseDto {

    private Long id;
    private Double totalPrice;
    private LocalDate dateBill;
    private String userId;
    private Map<String, Integer> billItems;

}
