import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const setLogout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const auth = (email, password, signUp) => {
    return dispatch => {
        dispatch(authStart());
        let url = signUp
            ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGYK-b5amSZtyqbJcLxoo5mptsRWZQX88'
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGYK-b5amSZtyqbJcLxoo5mptsRWZQX88';
        axios
            .post(url, {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .then(response => {
                localStorage.setItem('token', response.data.idToken);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('expirationDate', expirationDate);

                dispatch(authSuccess(response.data));
                dispatch(setLogout(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            });
    };
};