package server.thematicblogplatform.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveArticleRequest {
    private Long user_id;
    private Long article_id;
}
