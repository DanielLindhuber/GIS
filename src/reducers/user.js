import {
  REQUEST_USER,
  REQUEST_OVERVIEW,
  REQUEST_USER_CARPOOLS,
  REQUEST_USER_DRIVER_CARPOOLS
} from "../actions/types";

const INITIAL_STATE = {
  user: {},
  overview: [],
  carpools: [],
  driverCarpools: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_USER:
      return { ...state, user: action.payload };
    case REQUEST_OVERVIEW:
      return { ...state, overview: action.payload };
    case REQUEST_USER_CARPOOLS:
      return { ...state, carpools: action.payload };
    case REQUEST_USER_DRIVER_CARPOOLS:
      return { ...state, driverCarpools: action.payload };
    default:
      return state;
  }
}
