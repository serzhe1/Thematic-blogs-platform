package server.thematicblogplatform.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import server.thematicblogplatform.model.User;

@Getter
@Setter
@AllArgsConstructor
public class EditResponse {
    Boolean success;
    String message;
    User user;
}
