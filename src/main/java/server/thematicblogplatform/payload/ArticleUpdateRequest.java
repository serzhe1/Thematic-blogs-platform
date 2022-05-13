package server.thematicblogplatform.payload;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ArticleUpdateRequest {
    private Long id;
    private String name;
    private String content;
    private Long author;
    private Boolean type;
    private List<Long> tags;
}
