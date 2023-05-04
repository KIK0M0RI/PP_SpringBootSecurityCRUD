package com.kikomori.services;

import com.kikomori.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> findAll();

    Optional<User> findById(long id);

    User findByEmail(String email);

    void save(User user);

    void update(User user, long id);

    void deleteById(long id);
}
