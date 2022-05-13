package server.thematicblogplatform.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.thematicblogplatform.dto.ArticleDto;
import server.thematicblogplatform.payload.ArticleRequest;
import server.thematicblogplatform.service.ArticleService;
import server.thematicblogplatform.service.MappingUtils;
import server.thematicblogplatform.service.TagService;
import server.thematicblogplatform.service.UserService;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    @Autowired
    private TagService tagService;

    @GetMapping("/")
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(tagService.findAll());
    }
}
