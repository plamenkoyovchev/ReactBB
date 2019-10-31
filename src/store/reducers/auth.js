import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    loading: false,
    token: null,
    userId: null,
    error: null,
    authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
};

const authStart = state => {
    return updateObject(state, {
        loading: true, 
        error: null 
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        token: action.token,
        userId: action.userId,
        error: null
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
};

const authLogout = state => {
    return updateObject(state, {
        loading: false,
        error: null,
        userId: null,
        token: null
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    });
};

export default reducer;