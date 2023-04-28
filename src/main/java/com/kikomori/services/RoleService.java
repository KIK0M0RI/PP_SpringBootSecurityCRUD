package com.kikomori.services;

import com.kikomori.models.Role;

import java.util.List;

public interface RoleService {

    List<Role> findAll();

    Role findById(long id);

    void save(Role role);
}
