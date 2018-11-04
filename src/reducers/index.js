import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import user from "./user";
import select from "./select";

export default combineReducers({
  auth,
  user,
  select,
  form: formReducer
});
