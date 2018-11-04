import { REQUEST_SELECT } from "../actions/types";

const INITIAL_STATE = {
  selectData: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_SELECT:
      return { ...state, selectData: action.payload };
    default:
      return state;
  }
}
