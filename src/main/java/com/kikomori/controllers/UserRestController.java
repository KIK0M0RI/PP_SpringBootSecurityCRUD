package com.kikomori.controllers;

import com.kikomori.DTO.UserDTO;
import com.kikomori.models.User;
import com.kikomori.services.UserServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/user")
public class UserRestController {

    private final UserServiceImpl userService;
    private final ModelMapper modelMapper;

    @Autowired
    public UserRestController(UserServiceImpl userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/current")
    public ResponseEntity<UserDTO> getCurrentUser(Principal principal) {
        return ResponseEntity.ok(convertToUserDTO(userService.findByEmail(principal.getName())));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUser() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users.stream().map(this::convertToUserDTO).collect(Collectors.toList()));
    }

    @PostMapping("/save")
    public ResponseEntity<HttpStatus> saveUser(@RequestBody UserDTO userDTO) {
        userService.save(convertToUser(userDTO));
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<HttpStatus> deleteUser(@RequestBody UserDTO userDTO) {
        userService.deleteById(userDTO.getId());
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity<HttpStatus> updateUser(@RequestBody UserDTO userDTO) {
        userService.update(convertToUser(userDTO), userDTO.getId());
        return ResponseEntity.ok(HttpStatus.OK);
    }

    private User convertToUser(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }

    private UserDTO convertToUserDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }
}
