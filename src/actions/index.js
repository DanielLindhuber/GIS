import axios from "axios";
import {
  AUTH_USER,
  AUTH_ERROR,
  REQUEST_USER,
  REQUEST_USER_CARPOOLS,
  REQUEST_USER_DRIVER_CARPOOLS,
  REQUEST_OVERVIEW,
  REQUEST_SELECT,
  SET_SELECT_USER
} from "./types";

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

// get carpools
export const getUserCarpools = () => async dispatch => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3090/carpool/getCarpools",
      {
        headers: { authorization: token }
      }
    );

    dispatch({ type: REQUEST_USER_CARPOOLS, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

// get driver carpools
export const getUserDriverCarpools = () => async dispatch => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3090/carpool/getDriverCarpools",
      {
        headers: { authorization: token }
      }
    );

    dispatch({ type: REQUEST_USER_DRIVER_CARPOOLS, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

// Get overview data
export const getOverviewData = () => async dispatch => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3090/heat", {
      headers: { authorization: token }
    });

    dispatch({ type: REQUEST_OVERVIEW, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

// Get select data data
export const getSelectData = props => async dispatch => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:3090/select?class=${props.className}&name=${
        props.name
      }`,
      {
        headers: { authorization: token }
      }
    );

    dispatch({ type: REQUEST_SELECT, payload: response.data });
  } catch (e) {
    console.log(e);
  }
};

// Get select single user data data
export const setSelectSingleUserData = user => {
  return {
    type: SET_SELECT_USER,
    payload: user
  };
};

export const createCarpool = () => {
  try {
    const token = localStorage.getItem("token");
    axios.post("http://localhost:3090/carpool/create", {
      headers: { authorization: token }
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteCarpool = user => {};

export const leaveCarpool = user => {};

export const joinCarpool = user => {};

export const getCarpoolsRadius = user => {};
