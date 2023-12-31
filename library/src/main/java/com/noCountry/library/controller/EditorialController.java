package com.noCountry.library.controller;

import com.noCountry.library.dto.Book.BookResponse;
import com.noCountry.library.dto.Editorial.EditorialDto;
import com.noCountry.library.service.EditorialService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "${ALLOWED_ORIGINS}")
@RestController
@RequestMapping("/editorial")
public class EditorialController {

    private final EditorialService editorialService;

    @Autowired
    public EditorialController(EditorialService editorialService) {
        this.editorialService = editorialService;
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getEditorial(@PathVariable String id) throws Exception {
        try {
            EditorialDto editorial = editorialService.getEditorialById(id);
            return new ResponseEntity<>(editorial, HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    // Endpoint de prueba, se reemplaza con la busqueda dentor de libro
    @GetMapping(path = "/{id}/books")
    public ResponseEntity<?> getBooksByEditorial(@PathVariable String id) throws Exception {
        try {
            List<BookResponse> books = editorialService.getListBookOfEditorial(id);
            return new ResponseEntity<>(books, HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @PostMapping(path = "/createEditorial")
    public ResponseEntity<?> createEditorial(@RequestBody @Valid EditorialDto editorialRequest) throws Exception {
        try {
            EditorialDto editorial = editorialService.createEditorial(editorialRequest);
            return new ResponseEntity<>(editorial, HttpStatus.CREATED);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @PatchMapping(path = "/update")
    public ResponseEntity<?> updateEditorial(@RequestBody @Valid EditorialDto editorialRequest) throws Exception {
        try {
            EditorialDto editorial = editorialService.updateEditorial(editorialRequest);
            return new ResponseEntity<>(editorial, HttpStatus.CREATED);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteEditorial(@PathVariable String id) throws Exception {
        try {
            editorialService.deleteEditorial(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }


}
