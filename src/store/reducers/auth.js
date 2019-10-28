import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    token: null,
    userId: null,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                userId: action.userId,
                error: null
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                loading: false,
                error: null,
                userId: null,
                token: null
            };
        default:
            return state;
    }
};

export default reducer;