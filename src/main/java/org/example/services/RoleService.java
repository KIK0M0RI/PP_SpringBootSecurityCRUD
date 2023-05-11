package org.example.services;

import org.example.models.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {

    List<Role> findAll();

    Optional<Role> findById(long id);

    void save(Role role);
}
