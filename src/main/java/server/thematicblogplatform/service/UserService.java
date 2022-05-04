package server.thematicblogplatform.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import server.thematicblogplatform.dto.UserDto;
import server.thematicblogplatform.exception.AppException;
import server.thematicblogplatform.model.Role;
import server.thematicblogplatform.model.RoleName;
import server.thematicblogplatform.model.User;
import server.thematicblogplatform.repository.RoleRepository;
import server.thematicblogplatform.repository.UserRepository;

import java.util.Collections;

@Service
public class UserService {
    @Autowired
    private MappingUtils mappingUtils;

    @Autowired
    @Qualifier(value = "MyPasswordEncoder")
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public UserDto findById(Long id) {
        return mappingUtils.mapToUserDto(userRepository.findById(id).get());
    }

    public UserDto findByUsernameOrEmail(String login) {
        return mappingUtils.mapToUserDto(userRepository.findByUsernameOrEmail(login, login).get());
    }

    public boolean exitsByUsernameOrEmail(String username, String email) {
        if (userRepository.existsByUsername(username)) {
            return false;
        } else return !userRepository.existsByEmail(email);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User editUser(Long id, String name, String username, String email, String password) {
        UserDto user = findById(id);
        User userEntity;

        if (!name.equals("")) {
            user.setName(name);
        }

        if (!username.equals("") && !existsByUsername(username)) {
            user.setUsername(username);

        }
        if (!email.equals("") && !existsByEmail(email)) {
            user.setEmail(email);
        }

        if (password == null || password.equals("")) {
            userEntity = mappingUtils.mapToUserEntity(user);
            userRepository.save(userEntity);
            return userEntity;
        }

        user.setPassword(passwordEncoder.encode(password));
        userEntity = mappingUtils.mapToUserEntity(user);
        userRepository.save(userEntity);
        return userEntity;
    }

    public UserDto save(String name, String username, String email, String password) {
        User user = new User(
                name,
                username,
                email,
                passwordEncoder.encode(password)
        );

        Role userRole = roleRepository.findByName((RoleName.ROLE_USER))
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        return mappingUtils.mapToUserDto(result);
    }
}
