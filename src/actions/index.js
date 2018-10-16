import axios from "axios";
import { AUTH_USER, AUTH_ERROR, REQUEST_USER } from "./types";

// signin
export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      "http://localhost:3090/signin",
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem("token", response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
  }
};

// signout
export const signout = () => {
  localStorage.removeItem("token");

  return {
    type: AUTH_USER,
    payload: ""
  };
};

// Get user data
export const getUserData = () => async dispatch => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3090/", {
      headers: { authorization: token }
    });

    dispatch({ type: REQUEST_USER, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};
