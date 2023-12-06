package com.noCountry.library.entities;

import com.noCountry.library.entities.enums.Genre;

import com.noCountry.library.entities.enums.Language;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tbl_book")
public class Book extends PersistenceObject {

	private String ISBN;
	private String title;
	private Double price;
    private Integer pages;
	private LocalDate publicationDate;
    private Integer quantityAvailable;
	private Integer salesAmount;
	private Integer rating;
    private String description;
	private String collection;

	private String initialImage;
	private List<String> urlImages = new ArrayList<>();

	@Enumerated(EnumType.STRING)
	private Language language;

	@Enumerated(EnumType.STRING)
	private Genre genre;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "author_id", referencedColumnName = "id")
	private Author author;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "editorial_id", referencedColumnName = "id")
	private Editorial editorial;

}
