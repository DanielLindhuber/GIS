import { REQUEST_SELECT, SET_SELECT_USER } from "../actions/types";

const INITIAL_STATE = {
  selectData: [],
  singleUser: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_SELECT:
      return { ...state, selectData: action.payload };
    case SET_SELECT_USER:
      return { ...state, singleUser: action.payload };
    default:
      return state;
  }
}
