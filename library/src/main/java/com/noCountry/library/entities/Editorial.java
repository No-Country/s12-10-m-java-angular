package com.noCountry.library.entities;

import java.util.ArrayList;
import java.util.List;

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
	private String url;
	@OneToMany(mappedBy = "editorial")
	private List<Book> books = new ArrayList<>();

}
