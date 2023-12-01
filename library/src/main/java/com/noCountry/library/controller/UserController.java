package com.noCountry.library.controller;

import com.noCountry.library.dto.User.UpdatePasswordDto;
import com.noCountry.library.dto.User.UserDto;
import com.noCountry.library.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController {


    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping(path = "/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) throws Exception {
        try {
            UserDto user = userService.getUser(email);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }


    @DeleteMapping(path = "/{email}")
    public ResponseEntity<?> deleteUserByEmail(@PathVariable String email) throws Exception {
        try {
            userService.deleteUser(email);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @DeleteMapping(path = "/unsubscribe/{email}")
    public ResponseEntity<?> unsubscribeEmailUser(@PathVariable String email) throws Exception {
        try {
            userService.unsubscribeEmailUser(email);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @PatchMapping(path = "/update")
    public ResponseEntity<?> updateUser(@RequestBody @Valid UserDto userDto) throws Exception {
        try {
            UserDto userUpdated = userService.updateUser(userDto);
            return new ResponseEntity<>(userUpdated, HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @PutMapping(path = "/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody @Valid UpdatePasswordDto userDto) throws Exception {
        try {
            userService.updatePasswordUser(userDto);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }



}
