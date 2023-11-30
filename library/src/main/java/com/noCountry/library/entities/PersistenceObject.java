package com.noCountry.library.entities;

import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class PersistenceObject {
        @Id
        private String id;
        private Boolean status = true;
        private LocalDate creationDate;
        private LocalDate modificationDate;
}
