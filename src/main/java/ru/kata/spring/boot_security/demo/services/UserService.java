package ru.kata.spring.boot_security.demo.services;

import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserService {

    List<User> findAll();

    User findById(long id);

    User findByEmail(String email);

    void save(User user);

    void update(User user, long id);

    void deleteById(long id);
}
