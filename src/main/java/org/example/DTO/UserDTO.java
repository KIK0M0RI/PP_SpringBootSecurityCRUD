package org.example.DTO;

import org.example.models.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private long id;
    private String name;
    private String surname;
    private int age;
    private String email;
    private String password;
    private Collection<Role> roles;
}
