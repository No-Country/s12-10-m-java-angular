package com.noCountry.library.entities;

import java.time.LocalDate;
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
@Table(name = "tbl_autor")
public class Autor extends PersistenceObject {

	private String name;
	private String lastName;
	private LocalDate birthday;
	private String nationality;
    private String biography;

    @OneToMany(mappedBy = "autor")
	private ArrayList<Book> books = new ArrayList<>();


}
