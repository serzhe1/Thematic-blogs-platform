package server.thematicblogplatform.dto;

import lombok.Getter;
import lombok.Setter;
import server.thematicblogplatform.model.Tag;
import server.thematicblogplatform.model.User;

import java.util.List;

@Getter
@Setter
public class ArticleDto {
    private Long id;
    private String name;
    private String content;
    private UserDto author;
    private Boolean type;
    private List<TagDto> tags;
}
