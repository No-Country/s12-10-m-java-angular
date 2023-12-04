package com.noCountry.library.entities;

import com.noCountry.library.entities.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tbl_user")
public class User extends PersistenceObject implements UserDetails {

    private String name;
    private String lastName;
    @Column(unique = true)
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    protected Role role;
    protected Boolean isSubscribed = true;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (role == null) return null;
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.role.name()));

        return authorities;
    }

    public Collection<?> updateRole(Role newRole){
        this.role=newRole;

        List<SimpleGrantedAuthority> newAuthorities = new ArrayList<>();
        newAuthorities.add(new SimpleGrantedAuthority("ROLE_" + this.role.name()));

        
        return newAuthorities;
    }


    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
