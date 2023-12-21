package com.noCountry.library.service;

import org.springframework.http.ResponseEntity;

public interface AdminService {
    ResponseEntity<?> deleteUser(String email);

    ResponseEntity<?> modifyRole(String id);
}
