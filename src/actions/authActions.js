import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
//import jwtDecode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING
} from "./types"

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("https://api.forumconcepts.fr/api/users/registerUser", userData)
        .then(res => history.push('/admin'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login user w/ Token 
export const loginUser = userData => dispatch => {
    axios
    .post("https://api.forumconcepts.fr/api/users/loginUser", userData)
    .then(res => {
        //console.log(res)
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        //const decoded = jwtDecode(token);
        dispatch(setCurrentUser(res.data.user));
    })
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};