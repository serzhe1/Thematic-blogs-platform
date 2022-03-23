package server.thematicblogplatform.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {
    private String name;
    private String username;
    private String email;
    private String password;
}
