import moment from 'moment'
import _uniq from 'lodash/uniq'
import {
    GET_BOOKINGS,
    GET_BOOKINGS_SUCCESSFUL,
    GET_BOOKINGS_FAILURE,
} from './constants'

const defaultState = {
    loading: true,
    bookings: [],
    error: null,
}

const ACTION_HANDLERS = {

    [GET_BOOKINGS]: state => ({
        ...state,
        bookings: []
    }),

    [GET_BOOKINGS_SUCCESSFUL]: (state, { payload }) => ({
      ...state,
      bookings: payload,
      loading: false,  
    }),

    [GET_BOOKINGS_FAILURE]: (state, { error }) => ({
        ...state,
        error,
    }),

}

export default function bookingReducer(state = defaultState, action = {}) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state 
}