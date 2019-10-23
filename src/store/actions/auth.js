import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (response) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        response: response
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGYK-b5amSZtyqbJcLxoo5mptsRWZQX88', {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .then(response => {
                dispatch(authSuccess(response));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    };
};