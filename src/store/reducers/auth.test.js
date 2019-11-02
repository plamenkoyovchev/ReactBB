import * as actionTypes from '../actions/actionTypes';
import authReducer from './auth';

describe('Auth reducer', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            loading: false,
            token: null,
            userId: null,
            error: null,
            authRedirectPath: '/'
        };
    });

    it('should return initial state', () => {
        expect(authReducer(undefined, {}))
            .toEqual(initialState);
    });

    it('should store token on login', () => {
        const authSuccess = {
            type: actionTypes.AUTH_SUCCESS,
            token: 'some-token',
            userId: 'some-user-id'
        };

        expect(authReducer(initialState, authSuccess))
            .toEqual({
                loading: false,
                token: 'some-token',
                userId: 'some-user-id',
                error: null,
                authRedirectPath: '/'
            });
    });
});
