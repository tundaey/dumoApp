import {
    SEARCH_APPOINTMENTS,
    SEARCH_APPOINTMENTS_SUCCESSFUL,
    SEARCH_APPOINTMENTS_FAILURE,
} from './constants'

const defaultState = {
    loading: true,
    searchResults: [],
}

const ACTION_HANDLERS = {
    [SEARCH_APPOINTMENTS]: state => ({
        ...state,
    }),

    [SEARCH_APPOINTMENTS_FAILURE]: (state, { error }) => ({
        ...state,
        error,
    }),

    [SEARCH_APPOINTMENTS_SUCCESSFUL]: (state, { payload }) => ({
        ...state,
        searchResults: payload,
    }),

}

export default function searchReducer(state = defaultState, action = {}) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state 
}