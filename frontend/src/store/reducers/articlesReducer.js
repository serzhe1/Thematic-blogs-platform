import {
  CREATE_ARTICLES,
  DELETE_SAVED_ARTICLE,
  FIND_ALL,
  FIND_ALL_BY_TYPE,
  GET_AUTHOR_ARTICLES,
  GET_SAVED_ARTICLES,
  REMOVE_ARTICLE,
  SAVE_ARTICLE,
  SEARCH,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ARTICLES:
      return {
        ...state,
      };
    case GET_AUTHOR_ARTICLES:
      return {
        ...state,
        articles: payload.articles,
      };
    case GET_SAVED_ARTICLES:
      return {
        ...state,
        articles: payload.articles,
      };
    case REMOVE_ARTICLE:
      return {
        ...state,
      };
    case DELETE_SAVED_ARTICLE:
      return {
        ...state,
      };
    case FIND_ALL_BY_TYPE:
      return {
        ...state,
        articles: payload.articles,
      };
    case FIND_ALL:
      return {
        ...state,
        articles: payload.articles,
      };
    case SAVE_ARTICLE:
      return {
        ...state,
      };

    case SEARCH:
      return {
        ...state,
        articles: payload.articles,
      };
    default:
      return state;
  }
}
