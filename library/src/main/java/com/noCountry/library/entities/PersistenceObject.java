package com.noCountry.library.entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class PersistenceObject {
	
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	protected UUID id;
	protected Boolean status = Boolean.TRUE;
	protected LocalDate creationDate;
	protected LocalDate modificationDate;
}
