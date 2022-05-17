import { FIND_ALL_TAGS } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FIND_ALL_TAGS:
      return {
        ...state,
        tags: payload.tags,
      };
      default:
          return state;
  }
}
