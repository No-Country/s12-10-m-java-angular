package com.noCountry.library.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.noCountry.library.entities.enums.PaymentMethods;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "tbl_bill")
public class Bill {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Boolean status;
	private Double totalPrice;
	private LocalDate dateBill;

	@Enumerated(EnumType.STRING)
	private PaymentMethods paymentMethods;
	private String address;
	private Boolean delivery; // true si es entrega en domicilio, false para retiro en el local

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;

	@ToString.Exclude
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "bill_id", referencedColumnName = "id")
	private List<BillItem> billItems = new ArrayList<>();

}