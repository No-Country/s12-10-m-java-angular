package com.noCountry.library.entities;
/*
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
@Table(name = "tbl_bill")
public class Bill {


    // La factura si deberia de tener un id autoincremental normal.
    // para facilitar el registro de las compras
    // y no haria falta q tenga el registro de las 2 fechas (creacion y modificacion)
    // porq el de creacion ya se realiza y se detalla en la factura.
    // porq me parece q en una factura no se puede modificar, ne caso de ser erronea, solo se anula y se genera otra

    @Id
    private Long id;

    private Boolean status;


	private User user;

	@Column(length = 2048)
	private ArrayList<Book> books = new ArrayList<>();

	private Double totalPrice;

	private LocalDate dateBill;
}
*/