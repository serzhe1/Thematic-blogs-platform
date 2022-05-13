package server.thematicblogplatform.service;

import org.springframework.stereotype.Service;
import server.thematicblogplatform.dto.*;
import server.thematicblogplatform.model.Article;
import server.thematicblogplatform.model.Tag;
import server.thematicblogplatform.model.User;

import java.util.stream.Collectors;

@Service
public class MappingUtils {
    public UserDto mapToUserDto(User user) {
        UserDto dto = new UserDto();

        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        dto.setUsername(user.getUsername());
        dto.setPassword(user.getPassword());
        dto.setRoles(user.getRoles());

        return dto;
    }

    public User mapToUserEntity(UserDto userDto) {
        User user = new User();

        user.setId(userDto.getId());
        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setRoles(userDto.getRoles());

        return user;
    }

    public ArticleDto mapToArticleDto(Article article) {
        ArticleDto dto = new ArticleDto();

        dto.setId(article.getId());
        dto.setName(article.getName());
        dto.setContent(article.getContent());
        dto.setAuthor( mapToUserDto(article.getAuthor()));
        dto.setTags(article.getTags().stream().map(this::mapToTagDto).collect(Collectors.toList()));
        dto.setType(article.getType());

        return dto;
    }

    public Article mapToArticleEntity(ArticleDto dto) {
        Article article = new Article();

        article.setId(dto.getId());
        article.setName(dto.getName());
        article.setContent(dto.getContent());
        article.setAuthor(mapToUserEntity(dto.getAuthor()));
        article.setTags(dto.getTags().stream().map(this::mapToTagEntity).collect(Collectors.toList()));
        article.setType(dto.getType());

        return article;
    }

    public TagDto mapToTagDto(Tag tag) {
        TagDto dto = new TagDto();

        dto.setId(tag.getId());
        dto.setName(tag.getName());

        return dto;
    }

    public Tag mapToTagEntity(TagDto dto) {
        Tag tag = new Tag();

        tag.setId(dto.getId());
        tag.setName(dto.getName());

        return tag;
    }

    public UserWithArticlesDto mapToUserWithArticlesDto(User user) {
        UserWithArticlesDto dto = new UserWithArticlesDto();

        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setUsername(user.getUsername());
        dto.setRoles(user.getRoles());
        dto.setSavedArticles(user.getSavedArticles().stream().map(this::mapToArticleDto).collect(Collectors.toSet()));

        return dto;
    }

    public ArticleWithSubscribersDto mapToArticleWithSubscribersDto(Article article) {
        ArticleWithSubscribersDto dto = new ArticleWithSubscribersDto();

        dto.setId(article.getId());
        dto.setName(article.getName());
        dto.setContent(article.getContent());
        dto.setAuthor( mapToUserDto(article.getAuthor()));
        dto.setTags(article.getTags().stream().map(this::mapToTagDto).collect(Collectors.toList()));
        dto.setType(article.getType());
        dto.setSubscribers(article.getSubscribers().stream().map(e -> mapToUserDto(e)).collect(Collectors.toSet()));

        return dto;
    }

    public User mapToUserEntity (UserWithArticlesDto userDto) {
        User user = new User();

        user.setId(userDto.getId());
        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setRoles(userDto.getRoles());
        user.setSavedArticles(userDto.getSavedArticles().stream().map(this::mapToArticleEntity).collect(Collectors.toSet()));
        return user;
    }
}
