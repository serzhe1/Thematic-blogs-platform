package server.thematicblogplatform.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.thematicblogplatform.dto.ArticleDto;
import server.thematicblogplatform.dto.ArticleWithSubscribersDto;
import server.thematicblogplatform.dto.UserWithArticlesDto;
import server.thematicblogplatform.model.Article;
import server.thematicblogplatform.model.User;
import server.thematicblogplatform.repository.ArticleRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ArticleService {
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MappingUtils mappingUtils;

    public ArticleDto findbyId(Long id) {
        return mappingUtils.mapToArticleDto(articleRepository.findById(id).get());
    }

    public ArticleDto save (ArticleDto dto) {
        articleRepository.save(mappingUtils.mapToArticleEntity(dto));

        return dto;
    }

    public List<ArticleDto> findAllByAuthorId(Long id) {
        User author = mappingUtils.mapToUserEntity(userService.findById(id));
        return articleRepository.findAllByAuthor(author).stream().map(e -> mappingUtils.mapToArticleDto(e)).collect(Collectors.toList());
    }

    public Set<ArticleDto> findAllSaved(Long id) {
        UserWithArticlesDto user = userService.findUserWithArticles(id);

        return user.getSavedArticles();
    }

    public void removeById(Long id) {
        Article article = articleRepository.findById(id).get();

        for (User user : userService.findAll()) {
            Set<Article> updateSet = user.getSavedArticles();
            updateSet.remove(article);
            user.setSavedArticles(updateSet);
            userService.save(user);
        }

        articleRepository.delete(article);
    }

    public Article findById(Long id) {
        return articleRepository.findById(id).get();
    }
}
