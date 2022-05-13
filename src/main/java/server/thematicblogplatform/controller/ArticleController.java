package server.thematicblogplatform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.thematicblogplatform.dto.ArticleDto;
import server.thematicblogplatform.payload.ArticleRequest;
import server.thematicblogplatform.payload.ArticleUpdateRequest;
import server.thematicblogplatform.service.ArticleService;
import server.thematicblogplatform.service.TagService;
import server.thematicblogplatform.service.UserService;

@RestController
@RequestMapping("api/articles")
public class ArticleController {
    @Autowired
    private TagService tagService;

    @Autowired
    private UserService userService;

    @Autowired
    private ArticleService articleService;


    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody ArticleRequest articleRequest) {
        ArticleDto article = new ArticleDto();
        article.setContent(articleRequest.getContent());
        article.setName(articleRequest.getName());
        article.setTags(tagService.findByIds(articleRequest.getTags()));
        article.setAuthor(userService.findById(articleRequest.getAuthor()));
        article.setType(articleRequest.getType());

        articleService.save(article);

        return ResponseEntity.ok("success creation");
    }

    @GetMapping("/author/{id}")
    public ResponseEntity<?> authorArticles(@PathVariable Long id) {
        return ResponseEntity.ok(articleService.findAllByAuthorId(id));
    }

    @GetMapping("/{username}/saved")
    public ResponseEntity<?> findAllSaved(@PathVariable String username) {

        return ResponseEntity.ok(articleService.findAllSaved(userService.findByUsernameOrEmail(username).getId()));
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody ArticleUpdateRequest articleRequest) {
        ArticleDto article = articleService.findbyId(articleRequest.getId());
        article.setContent(articleRequest.getContent());
        article.setName(articleRequest.getName());
        article.setTags(tagService.findByIds(articleRequest.getTags()));
        article.setType(articleRequest.getType());

        articleService.save(article);

        return ResponseEntity.ok("success updating");
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> remove (@PathVariable Long id) {
        articleService.removeById(id);
        return ResponseEntity.ok("success removing");
    }

    @DeleteMapping("/{username}/saved/{id}")
    public ResponseEntity<?> removeSaved (@PathVariable String username, @PathVariable Long id) {
        userService.deleteSavedArticle(username, articleService.findById(id));

        return ResponseEntity.ok("success removing");
    }
}
