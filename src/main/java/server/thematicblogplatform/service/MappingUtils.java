package server.thematicblogplatform.service;

import org.springframework.stereotype.Service;
import server.thematicblogplatform.dto.UserDto;
import server.thematicblogplatform.model.User;

@Service
public class MappingUtils {
    public UserDto mapToUserDto(User user) {
        UserDto dto = new UserDto();

        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        dto.setUsername(user.getUsername());
        dto.setPassword(user.getPassword());
        dto.setRoles(user.getRoles());

        return dto;
    }

    public User mapToUserEntity(UserDto userDto) {
        User user = new User();

        user.setId(userDto.getId());
        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setRoles(userDto.getRoles());

        return user;
    }
}
