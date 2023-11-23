package com.noCountry.library.entities;

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
public class Editorial extends PersistenceObject {

	private String name;
	@Column(length = 2048)
	private ArrayList<Book> books;
	private String email;

}
