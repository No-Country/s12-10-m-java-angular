package com.noCountry.library.controller;

import com.noCountry.library.exception.NotFoundException;
import com.noCountry.library.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUSer (@PathVariable String id){
        try {
            return adminService.deleteUser(id);
        }catch (NotFoundException e){
            throw new NotFoundException("Usuario no encontrado en la base de datos");
        }

    }

    @PutMapping("/modifyRole")
    public ResponseEntity<?> modifyRole (String id){
        return adminService.modifyRole(id);
    }


}
