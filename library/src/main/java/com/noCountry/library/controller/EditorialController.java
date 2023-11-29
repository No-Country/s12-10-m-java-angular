package com.noCountry.library.controller;

import com.noCountry.library.dto.Editorial.EditorialDto;
import com.noCountry.library.service.EditorialService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${ALLOWED_ORIGINS}")
@RestController
@RequestMapping("/editorial")
public class EditorialController {

    private final EditorialService editorialService;

    @Autowired
    public EditorialController(EditorialService editorialService) {
        this.editorialService = editorialService;
    }

    @PostMapping(path = "/createEditorial")
    public ResponseEntity<?> createBook(@RequestBody @Valid EditorialDto editorialRequest) throws Exception {
        try {
            EditorialDto editorial = editorialService.createEditorial(editorialRequest);
            return new ResponseEntity<>(editorial, HttpStatus.CREATED);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }




}
