// import {
//     UNAUTH,
//     AUTH_SUCCESS,
//     AUTH_FAILURE,
//     AUTH_USER,
//     GET_DATA_SUCCESS,
//     GET_DATA_FAILURE,
// } from '../auth/actions'

// const defaultState = {
//     loading: false,
//     user: null
// }

import {
    SET_AUTH_PENDING,
    SET_LOGIN_SUCCESS,
    SET_LOGIN_ERROR,
    SET_REGISTER_SUCCESS,
    SET_REGISTER_ERROR,
    SET_LOGOUT,
    SAVE_APP_TOKEN,
    INVALID_TOKEN,
    REFRESHING_TOKEN,
    TOKEN_REFRESHED,
} from './actions';

const defaultState = {
    authPending: false,
	loggedIn: false,
	registered: false,
	loginError: false,
	regError: false,
	authToken: null,
	refreshToken: null,
	tokenIsValid: null,
	pendingRefreshingToken: null
}

const ACTION_HANDLERS = {
    [SET_AUTH_PENDING]: state => ({
        ...state,
		authPending: true
    }),

    [SET_LOGIN_ERROR]: (state, { loginError }) => ({
        ...state,
        authPending: false,
        loginError: true,
        loginErrorMessage: loginError,
    }),

    [SET_LOGIN_SUCCESS]: (state, { authToken, refreshToken }) => ({
        ...state,
        authPending: false,
        loggedIn: true,
        loginError: false,
        authToken: authToken,
        refreshToken: refreshToken
    }),

    [SET_REGISTER_SUCCESS]: (state, { authToken, refreshToken }) => ({
        ...state,
        authPending: false,
        loggedIn: true,
        loginError: false,
        authToken: authToken,
        refreshToken: refreshToken
    }),

    [SET_REGISTER_ERROR]: (state, { regError }) => ({
        ...state,
        authPending: false,
		regError: regError
    }),

    [SET_LOGOUT]: state => ({
        ...state,
        authToken: false,
        refreshToken: false,
        loggedIn: false
    }),

    [INVALID_TOKEN]: state => ({
        ...state,
        tokenIsValid: false,
    }),

    [REFRESHING_TOKEN]: state => ({
        ...state,
        pendingRefreshingToken: true,
		tokenIsValid: false,
    }),

    [TOKEN_REFRESHED]: state => ({
        ...state,
        pendingRefreshingToken: null,
		tokenIsValid: true
    }),

    [SAVE_APP_TOKEN]: state => ({
        ...state,
        authToken: authToken,
    })
}

// const ACTION_HANDLERS = {
//     [UNAUTH]: state => ({
//         ...state,
//         user: null,
//         loading: false,
//     }),

//     [AUTH_USER]: state => ({
//         ...state,
//         loading: true
//     }),

//     [AUTH_SUCCESS]: (state, { user }) => ({
//         ...state,
//         [user.id]: user,
//         loading: false
//     }),

//     [AUTH_FAILURE]: (state, { error }) => ({
//         ...state,
//         error,
//         loading: false,
//         user: null,
//     }),
//     [GET_DATA_SUCCESS]: (state, { user }) => ({
//         ...state,
//         [user.id]: user,
//         //loading: false
//     }),

//     [GET_DATA_FAILURE]: (state, { error }) => ({
//         ...state,
//         error,
//         //loading: false,
//         user: null,
//     })
// }

export default function authReducer(state = defaultState, action = {}) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state 
}