package server.thematicblogplatform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.thematicblogplatform.payload.EditRequest;
import server.thematicblogplatform.payload.EditResponse;
import server.thematicblogplatform.service.UserService;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/edit")
    public ResponseEntity<?> editProfile(@RequestBody EditRequest editRequest) {
        if (editRequest.getId() == null)
            return new ResponseEntity(new EditResponse(false, "user id is null", null), HttpStatus.BAD_REQUEST);

        return ResponseEntity.ok(new EditResponse(true, "success", userService.editUser(editRequest.getId()
                , editRequest.getName()
                , editRequest.getUsername()
                , editRequest.getEmail()
                , editRequest.getPassword())));
    }
}
