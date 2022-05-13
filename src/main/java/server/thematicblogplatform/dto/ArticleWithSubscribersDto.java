package server.thematicblogplatform.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class ArticleWithSubscribersDto {
    private Long id;
    private String name;
    private String content;
    private UserDto author;
    private Boolean type;
    private List<TagDto> tags;
    private Set<UserDto> subscribers;
}
