package com.noCountry.library.entities;

import java.util.ArrayList;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_editorial")
public class Editorial extends PersistenceObject {

	private String name;
	private String email;

	@OneToMany(mappedBy = "editorial")
	private ArrayList<Book> books;


}
