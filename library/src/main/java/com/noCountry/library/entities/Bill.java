package com.noCountry.library.entities;

import java.time.LocalDate;
import java.util.ArrayList;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bill extends PersistenceObject {

	private User user;
	@Column(length = 2048)
	private ArrayList<Book> books = new ArrayList<>();
	private Double totalPrice;
	private LocalDate date;
}
