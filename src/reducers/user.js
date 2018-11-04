import { REQUEST_USER, REQUEST_OVERVIEW } from "../actions/types";

const INITIAL_STATE = {
  user: {},
  overview: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_USER:
      return { ...state, user: action.payload };
    case REQUEST_OVERVIEW:
      return { ...state, overview: action.payload };
    default:
      return state;
  }
}
