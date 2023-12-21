package com.noCountry.library.repository;

import com.noCountry.library.entities.UrlImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UrlImageRepository extends JpaRepository<UrlImage, String> {
}
