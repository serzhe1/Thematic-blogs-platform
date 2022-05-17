import articlesService from "../../services/articlesService";
import {
  CREATE_ARTICLES,
  GET_AUTHOR_ARTICLES,
  GET_SAVED_ARTICLES,
  UPDATE_ARTICLE,
  REMOVE_ARTICLE,
  DELETE_SAVED_ARTICLE,
  FIND_ALL_BY_TYPE,
  FIND_ALL,
  SAVE_ARTICLE,
  SEARCH,
} from "./types";

export const createArticle = (article) => (dispatch) => {
  return articlesService.create(article).then((data) => {
    dispatch({
      type: CREATE_ARTICLES,
    });
  });
};

export const update = (article) => (dispatch) => {
  return articlesService.update(article).then((data) => {
    dispatch({
      type: UPDATE_ARTICLE,
    });
  });
};

export const getAuthorArticles = (id) => (dispatch) => {
  return articlesService.findAllAuthorArticles(id).then((data) => {
    dispatch({
      type: GET_AUTHOR_ARTICLES,
      payload: { articles: data },
    });
  });
};

export const findSavedArticles = (username) => (dispatch) => {
  return articlesService.findSavedArticles(username).then((data) => {
    dispatch({
      type: GET_SAVED_ARTICLES,
      payload: { articles: data },
    });
  });
};

export const removeArticle = (id) => (dispatch) => {
  return articlesService.removeArticle(id).then((data) => {
    dispatch({
      type: REMOVE_ARTICLE,
    });
  });
};

export const deleteSavedArticle = (username, id) => (dispatch) => {
  return articlesService.deleteSavedArticle(username, id).then((data) => {
    dispatch({
      type: DELETE_SAVED_ARTICLE,
    });
  });
};

export const findAllByType = (type) => (dispatch) => {
  return articlesService.findAllByType(type).then((data) => {
    dispatch({
      type: FIND_ALL_BY_TYPE,
      payload: { articles: data },
    });
  });
};

export const findAll = () => (dispatch) => {
  return articlesService.findAll().then((data) => {
    dispatch({
      type: FIND_ALL,
      payload: { articles: data },
    });
  });
};

export const saveArticle = (user_id, article_id) => (dispatch) => {
  return articlesService.saveArticle(user_id, article_id).then((data) => {
    dispatch({
      type: SAVE_ARTICLE,
    });
  });
};

export const searchByName = (name) => (dispatch) => {
  return articlesService.searchByName(name).then((data) => {
    dispatch({
      type: SEARCH,
      payload: { articles: data },
    });
  });
};

export const searchByAllParams = (name, tags, news) => (dispatch) => {
  return articlesService.searchByAllParams(name, tags, news).then((data) => {
    dispatch({
      type: SEARCH,
      payload: { articles: data },
    });
  });
};
