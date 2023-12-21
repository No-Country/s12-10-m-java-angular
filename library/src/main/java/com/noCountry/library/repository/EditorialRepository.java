package com.noCountry.library.repository;

import com.noCountry.library.entities.Editorial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EditorialRepository extends JpaRepository<Editorial, String> {

    @Query("SELECT e FROM Editorial e WHERE LOWER(e.name) = LOWER(:name) AND e.status = true")
    Optional<Editorial> findByNameIgnoreCaseAndStatusTrue(@Param("name") String name);

}
