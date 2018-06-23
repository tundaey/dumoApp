import _uniq from 'lodash/uniq'
import _uniqBy from 'lodash/uniqBy'
import _sortBy from 'lodash/sortBy'

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
    SET_DAY_APPOINTMENTS_SUCCESS,
} from './constants';


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
    calendar: {},
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
        profile: payload,
        // profileUpdated: true
    }),

    [UPDATE_PROFILE_FAILURE]: (state, {error}) => ({
        ...state,
        profileUpdated: false
    }),

    [SET_DAY_APPOINTMENTS]: state => ({
        ...state,
    }),

    [SET_DAY_APPOINTMENTS_SUCCESS]: (state, { appointment, day }) => {
        const payload = { time: appointment.time, available: appointment.available }
        //const combinedAppointments = [...state.calendar[day] , ...state.calendarDefault.concat(payload)];
        const newAppointments = [appointment]
        const combinedAppointments = [...newAppointments, ...state.calendar[day]];
        console.log('combinedAppointment', _sortBy(_uniqBy(combinedAppointments, 'time'), 'time'))
        return {
            ...state,
            calendar: {
                ...state.calendar,
                [day]: _sortBy(_uniqBy(combinedAppointments, 'time'), 'time')
            }
        }
    },

    [GET_DAY_APPOINTMENTS_SUCCESS]: (state, {appointments, day}) => {
        const combinedAppointments = [...appointments, ...state.calendarDefault];
        const newAppointments = _uniqBy(combinedAppointments, 'time');
        return {
            ...state,
            calendar: {
                [day]: appointments.length <= 0 
                    ? state.calendarDefault 
                    : newAppointments
            }
        }
    }

}

export default function profileReducer(state = defaultState, action = {}) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state 
}