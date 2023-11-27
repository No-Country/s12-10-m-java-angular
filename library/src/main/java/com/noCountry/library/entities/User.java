package com.noCountry.library.entities;

import com.noCountry.library.entities.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User extends PersistenceObject {

    protected String name;
    protected String lastName;
    protected String email;
    protected String password;
    @Enumerated(EnumType.STRING)
    protected Role role;

    protected Boolean isSubscribed;




}
