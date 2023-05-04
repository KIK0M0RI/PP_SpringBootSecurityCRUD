package com.kikomori.services;

import com.kikomori.models.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {

    List<Role> findAll();

    Optional<Role> findById(long id);

    void save(Role role);
}
