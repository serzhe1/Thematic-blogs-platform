import { combineReducers } from "redux";
import articlesReducer from "./articlesReducer";
import authReducer from "./authReducer";
import tagsReducer from "./tagsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  tags: tagsReducer,
  articles: articlesReducer
});

export default rootReducer;
