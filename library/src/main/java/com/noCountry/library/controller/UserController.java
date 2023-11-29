package com.noCountry.library.controller;

import com.noCountry.library.dto.User.ResponseUserDto;
import com.noCountry.library.dto.User.UpdatePasswordDto;
import com.noCountry.library.dto.User.UserDto;
import com.noCountry.library.entities.User;
import com.noCountry.library.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "${ALLOWED_ORIGINS}")
@RestController
@RequestMapping("/user")
public class UserController {


    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) throws Exception {
        try {
            User user = userService.getUserById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }


    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable String id) throws Exception {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @DeleteMapping(path = "/unsubscribe/{id}")
    public ResponseEntity<?> unsubscribeEmailUser(@PathVariable String id) throws Exception {
        try {
            userService.unsubscribeEmailUser(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @PatchMapping(path = "/update")
    public ResponseEntity<?> updateUser(@RequestBody @Valid UserDto userDto) throws Exception {
        try {
            ResponseUserDto userUpdated = userService.updateUser(userDto);
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
