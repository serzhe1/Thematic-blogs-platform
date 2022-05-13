package server.thematicblogplatform.dto;

import lombok.Getter;
import lombok.Setter;
import server.thematicblogplatform.model.Role;

import java.util.Set;

@Setter
@Getter
public class UserWithArticlesDto{
    private Long id;
    private String name;
    private String username;
    private String email;
    private String password;
    private Set<Role> roles;
    private Set<ArticleDto> savedArticles;
}
