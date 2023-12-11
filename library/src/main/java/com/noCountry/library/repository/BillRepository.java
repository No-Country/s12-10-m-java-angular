package com.noCountry.library.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.noCountry.library.entities.Bill;

@Repository
public interface BillRepository extends JpaRepository<Bill, String> {

	List<Bill> findByStatusTrue();
}
