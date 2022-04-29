package server.thematicblogplatform.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import server.thematicblogplatform.dto.UserDto;

@Getter
@Setter
@AllArgsConstructor
public class JwtAuthenticationResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    private UserDto user;

    public JwtAuthenticationResponse(String accessToken, UserDto user) {
        this.accessToken = accessToken;
        this.user = user;
    }
}
