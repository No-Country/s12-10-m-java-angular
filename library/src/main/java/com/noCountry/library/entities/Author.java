package com.noCountry.library.entities;

import java.time.LocalDate;
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
@Table(name = "tbl_author")
public class Author extends PersistenceObject {

	private String name;
	private String lastName;
	private String fullName;
	private LocalDate birthday;
	private String nationality;
    private String biography;
    @OneToMany(mappedBy = "author")
	private List<Book> books = new ArrayList<>();

}
