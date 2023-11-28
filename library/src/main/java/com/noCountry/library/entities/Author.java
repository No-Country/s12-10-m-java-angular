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
@Table(name = "tbl_author")
public class Author extends PersistenceObject {

	private String name;
	private String lastName;
	private LocalDate birthday;
	private String nationality;
    private String biography;

    @OneToMany(mappedBy = "author")
	private ArrayList<Book> books = new ArrayList<>();


}
