package com.noCountry.library.service.impl;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import com.noCountry.library.dto.Bill.BillResponseDto;
import com.noCountry.library.entities.BillItem;
import com.noCountry.library.entities.Book;
import com.noCountry.library.repository.BookRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.noCountry.library.dto.Bill.BillRequestDto;
import com.noCountry.library.dto.Bill.MapperBill;
import com.noCountry.library.entities.Bill;
import com.noCountry.library.entities.User;
import com.noCountry.library.exception.BadRequestException;
import com.noCountry.library.repository.BillRepository;
import com.noCountry.library.repository.UserRepository;
import com.noCountry.library.service.BillService;

@Service
public class BillServiceImpl implements BillService {


    private final BillRepository billRepository;

    private final UserRepository userRepository;

	private final BookRepository bookRepository;

    private final BookServiceImpl bookService;

    private final MapperBill mapperBill;

	private final EmailServiceImpl emailService;

	@Autowired
	public BillServiceImpl(BillRepository billRepository, UserRepository userRepository, BookRepository bookRepository,
						   MapperBill mapperBill, EmailServiceImpl emailService, BookServiceImpl bookService) {
		this.billRepository = billRepository;
		this.userRepository = userRepository;
		this.bookRepository = bookRepository;
		this.mapperBill = mapperBill;
		this.emailService = emailService;
        this.bookService = bookService;
	}


    @Transactional
    @Override
    public ResponseEntity<String> generateBill(BillRequestDto billRequestDto) {

        ResponseEntity<String> response = null;
        Optional<User> userOptional = userRepository.findById(billRequestDto.getUserId());
        try {
            if (userOptional.isPresent()) {
                Bill bill = new Bill();

                bill.setStatus(Boolean.TRUE);
                bill.setDateBill(LocalDate.now());
                bill.setUser(userOptional.get());
                bill.setBillItems(getBillItems(billRequestDto.getBookQuantities()));

				double totalPrice = addingPrices(bill.getBillItems());
                bill.setTotalPrice(totalPrice);

                // Actualizar la cantidad de libros vendidos
                sellBooks(bill.getBillItems());

                billRepository.save(bill);

                sendEmailBill(bill);

                response = ResponseEntity.ok("Bill added successfully");
            }
        } catch (Exception e) {
            e.printStackTrace();
            response = ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add bill");
        }
        return response;
    }

    @Override
    public List<BillResponseDto> getAll() {
        // implementamos con paginacion para retornar la info?
        List<Bill> list = billRepository.findByStatusTrue();
        return list.stream().map(mapperBill::billToBillResponseDto).collect(Collectors.toList());
    }

    @Override
    public ResponseEntity<String> logicalDeletionBill(Long id) {
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


	private List<BillItem> getBillItems(Map<String, Integer> billItems) {
        List<BillItem> listBooks = new ArrayList<>();
		Optional<Book> bookAux;

        for (Map.Entry<String, Integer> entry : billItems.entrySet()) {
            String bookId = entry.getKey();
            Integer quantity = entry.getValue();

            bookAux = bookRepository.findById(bookId);

            if (bookAux.isPresent()) {
                Book book = bookAux.get();

                BillItem billItem = new BillItem();
                billItem.setBook(book);
                billItem.setQuantity(quantity);

                listBooks.add(billItem);
            } else {
                throw new BadRequestException("El libro de id: " + bookId + " no se encuentra registrado.");
            }
        }
        return listBooks;
	}

	private Double addingPrices(List<BillItem> listBillItems) {
		double totalPrice = 0.0;

		for (BillItem item: listBillItems) {
            if (item.getQuantity() > 0) {
                totalPrice += (item.getBook().getPrice()) * item.getQuantity();
            } else {
                throw new BadRequestException("La cantidad de libros a comprar no puede ser menor a 1.");
            }
		}
		return totalPrice;
	}

    private void sellBooks(List<BillItem> billItem) {
        for (BillItem item : billItem) {
            bookService.subtractAmount(item.getBook().getId(), item.getQuantity());
        }
    }

    private void sendEmailBill(Bill bill) {
        Map<String, Object> templateModel = new HashMap<>();

        String fullName = bill.getUser().getName() + " " + bill.getUser().getLastName();

        templateModel.put("userName", fullName);
        templateModel.put("shippingAddress", bill.getUser().getEmail());
        templateModel.put("paymentDate", bill.getDateBill());
        templateModel.put("invoiceNumber", bill.getId());
        templateModel.put("subTotal", bill.getTotalPrice());
        templateModel.put("items", new ArrayList<Map<String, Object>>());

        List<Map<String, Object>> items = (List<Map<String, Object>>) templateModel.get("items");

        for (BillItem item: bill.getBillItems()) {
            Map<String, Object> newItem = new HashMap<>();

            newItem.put("bookName", item.getBook().getTitle());
            newItem.put("price", item.getBook().getPrice());
            newItem.put("quantity", item.getQuantity());

            items.add(newItem);
        }

        templateModel.put("items", items);

        String subject = "Thanks for your purchase!";
        emailService.sendSaleEmailWithPDFBill(bill.getUser().getEmail(), subject, templateModel);
    }
}
