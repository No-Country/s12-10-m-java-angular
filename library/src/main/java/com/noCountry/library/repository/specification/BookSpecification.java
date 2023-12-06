package com.noCountry.library.repository.specification;

import com.noCountry.library.entities.Book;
import com.noCountry.library.entities.enums.Genre;
import com.noCountry.library.entities.enums.Language;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class BookSpecification {

    public static Specification<Book> filterByCriteria(Double minPrice,
                                                       Double maxPrice,
                                                       Integer minPages,
                                                       Genre genre,
                                                       Language language,
                                                       Integer searchEvenNotAvailable
                                                       ) {
        return (root, query, criteriaBuilder) -> {

            // Almaceno condiciones
            List<Predicate> predicates = new ArrayList<>();

            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            if (minPages != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("pages"), minPages));
            }

            if (genre != null) {
                predicates.add(criteriaBuilder.equal(root.get("genre"), genre));
            }

            if (language != null) {
                predicates.add(criteriaBuilder.equal(root.get("language"), language));
            }

            if (searchEvenNotAvailable != null && searchEvenNotAvailable == 0) {
                // Buscamos los libros con y sin stock
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("quantityAvailable"), 0));
            } else {
                // por defecto siempre devolvemos los libros con stock
                predicates.add(criteriaBuilder.greaterThan(root.get("quantityAvailable"), 0));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

}
