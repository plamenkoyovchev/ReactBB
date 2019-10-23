import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    token: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.response.idToken
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
};

export default reducer;