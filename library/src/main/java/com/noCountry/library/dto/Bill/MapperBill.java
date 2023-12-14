package com.noCountry.library.dto.Bill;

import com.noCountry.library.entities.BillItem;
import com.noCountry.library.entities.Book;
import org.springframework.stereotype.Component;

import com.noCountry.library.entities.Bill;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class MapperBill {
	
	public BillResponseDto billToBillResponseDto(Bill bill) {
		String userId = bill.getUser().getId();
		BillResponseDto billDto = new BillResponseDto();

		billDto.setId(bill.getId());
		billDto.setTotalPrice(bill.getTotalPrice());
		billDto.setDateBill(bill.getDateBill());
		billDto.setUserId(userId);
		billDto.setBillItems(billItemsToMap(bill.getBillItems()));

		return billDto;
	}

	private Map<String, Integer> billItemsToMap(List<BillItem> billItemList) {
		Map<String, Integer> billItemsMap = new HashMap<>();

		for (BillItem item: billItemList) {
			String bookId = item.getBook().getId();
			Integer quantity = item.getQuantity();

			billItemsMap.put(bookId, quantity);
		}
		return billItemsMap;
	}

}
