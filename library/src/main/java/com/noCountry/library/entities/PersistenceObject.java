package com.noCountry.library.entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class PersistenceObject {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	private Boolean status = Boolean.TRUE;
	private LocalDate creationDate;
	private LocalDate modificationDate;
}
