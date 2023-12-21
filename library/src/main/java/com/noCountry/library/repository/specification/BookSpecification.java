package com.noCountry.library.repository.specification;

import com.noCountry.library.entities.Author;
import com.noCountry.library.entities.Book;
import com.noCountry.library.entities.Editorial;
import com.noCountry.library.entities.enums.Genre;
import com.noCountry.library.entities.enums.Language;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class BookSpecification {

    public static Specification<Book> filterByCriteria(Double minPrice,
                                                       Double maxPrice,
                                                       Integer minPages,
                                                       List<Genre> genres,
                                                       List<Language> languages,
                                                       String searchText,
                                                       Integer searchEvenNotAvailable
                                                       ) {
        return (root, query, criteriaBuilder) -> {

            // Almaceno condiciones
            List<Predicate> predicates = new ArrayList<>();

            String searchTextLowerCase = searchText.toLowerCase();
            Join<Book, Author> authorJoin = root.join("author", JoinType.INNER);
            Join<Book, Editorial> editorialJoin = root.join("editorial", JoinType.INNER);

            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            if (minPages != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("pages"), minPages));
            }

            if (genres != null && !genres.isEmpty()) {
                //predicates.add(criteriaBuilder.equal(root.get("genre"), genre));
                predicates.add(root.get("genre").in(genres));
            }

            if (languages != null && !languages.isEmpty()) {
                //predicates.add(criteriaBuilder.equal(root.get("language"), language));
                predicates.add(root.get("language").in(languages));
            }

            if (searchEvenNotAvailable != null && searchEvenNotAvailable == 0) {
                // Buscamos los libros con y sin stock
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("quantityAvailable"), 0));
            } else {
                // por defecto siempre devolvemos los libros con stock
                predicates.add(criteriaBuilder.greaterThan(root.get("quantityAvailable"), 0));
            }

            predicates.add(criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + searchTextLowerCase + "%"),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), "%" + searchTextLowerCase + "%"),
                    criteriaBuilder.like(criteriaBuilder.lower(authorJoin.get("name")), "%" + searchTextLowerCase + "%"),
                    criteriaBuilder.like(criteriaBuilder.lower(authorJoin.get("lastName")), "%" + searchTextLowerCase + "%"),
                    criteriaBuilder.like(criteriaBuilder.lower(authorJoin.get("fullName")), "%" + searchTextLowerCase + "%"),
                    criteriaBuilder.like(criteriaBuilder.lower(editorialJoin.get("name")), "%" + searchTextLowerCase + "%")
            ));

            // Añadir la condición de estado solo si hay otros criterios de filtro presentes
            Predicate statusPredicate = criteriaBuilder.isTrue(root.get("status"));

            return criteriaBuilder.and(statusPredicate, criteriaBuilder.and(predicates.toArray(new Predicate[0])));
        };
    }

    public static Specification<Book> filterByText(String searchText) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (searchText != null && !searchText.isEmpty()) {
                String searchTextLowerCase = searchText.toLowerCase();
                Join<Book, Author> authorJoin = root.join("author", JoinType.INNER);
                Join<Book, Editorial> editorialJoin = root.join("editorial", JoinType.INNER);

                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + searchTextLowerCase + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), "%" + searchTextLowerCase + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(authorJoin.get("name")), "%" + searchTextLowerCase + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(authorJoin.get("lastName")), "%" + searchTextLowerCase + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(authorJoin.get("fullName")), "%" + searchTextLowerCase + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(editorialJoin.get("name")), "%" + searchTextLowerCase + "%")
                ));
            }

            return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
        };
    }

}
