package com.noCountry.library.entities;

import com.noCountry.library.entities.enums.Genre;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_book")
public class Book extends PersistenceObject {

	private Long ISBN;
	private String title;
	private Double price;
    private Integer pages;
	private LocalDate d;
    private Integer quantityAvailable;
	private Integer salesAmount;
	private Integer rating;
    private String description;

	private String initialImage;
	private ArrayList<String> urlImages;

	@Enumerated(EnumType.STRING)
	private Genre genre;

    @ManyToOne
    @JoinColumn(name = "author_id", referencedColumnName = "id")
	private Author author;

    @ManyToOne
    @JoinColumn(name = "editorial_id", referencedColumnName = "id")
	private Editorial editorial;

}
