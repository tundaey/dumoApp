import {
    GET_DATA_SUCCESS,
    LOADING_PROFILE,
    GET_DATA_FAILURE,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    GET_DEFAULT_APPOINTMENTS,
    SET_DAY_APPOINTMENTS,
    GET_DAY_APPOINTMENTS,
    GET_DAY_APPOINTMENTS_SUCCESS,
} from './constants'

const defaultState = {
    loading: true,
    profile: null,
    profileUpdated: null,
    calendarDefault: [
        {time:"08:00", available: false}, 
        {time:"09:00", available: false}, 
        {time:"10:00", available: false}, 
        {time:"11:00", available: false}, 
        {time:"12:00", available: false}, 
        {time:"13:00", available: false}, 
        {time:"14:00", available: false}, 
        {time:"15:00", available: false}, 
        {time:"16:00", available: false}, 
        {time:"17:00", available: false}, 
        {time:"18:00", available: false}, 
        {time:"19:00", available: false}, 
        {time:"20:00", available: false}, 
        {time:"21:00", available: false},
    ],
    calendar: [],
}

const ACTION_HANDLERS = {
    [LOADING_PROFILE]: state => ({
        ...state,
        loading: true
    }),

    [GET_DATA_SUCCESS]: (state, { user }) => ({
        ...state,
        profile: user,
        loading: false
    }),

    [GET_DATA_FAILURE]: (state, { error }) => ({
        ...state,
        error,
        loading: false,
        profile: null,
    }),

    [UPDATE_PROFILE_SUCCESS]: (state, { payload }) => ({
        ...state,
        profile: {
            ...state.profile,
            payload,
        },
        profileUpdated: true
    }),

    [UPDATE_PROFILE_FAILURE]: (state, {error}) => ({
        ...state,
        profileUpdated: false
    }),

    [SET_DAY_APPOINTMENTS]: (state, {appointments, day}) => ({
        ...state,
        calendar: {
            ...state.calendar,
            [day]: appointments
        }
    }),

    [GET_DAY_APPOINTMENTS_SUCCESS]: (state, {appointments}) => ({
        ...state,
        calendar: appointments
    })

}

export default function profileReducer(state = defaultState, action = {}) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state 
}