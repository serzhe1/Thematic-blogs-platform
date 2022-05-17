import tagService from "../../services/tagService";
import { FIND_ALL_TAGS } from "./types";

export const findAll = () => (dispatch) => {
  return tagService.findAll().then((data) => {
    dispatch({
      type: FIND_ALL_TAGS,
      payload: { tags: data },
    });
  });
};
