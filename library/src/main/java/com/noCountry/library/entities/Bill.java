package com.noCountry.library.entities;

import java.time.LocalDate;
import java.util.ArrayList;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_bill")
public class Bill {

	@Id
	private String id;
	private Boolean status;
	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;
	@OneToMany
	private ArrayList<Book> books = new ArrayList<>();
	private Double totalPrice;
	private LocalDate dateBill;
}