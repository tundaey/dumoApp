import moment from 'moment'
import _uniq from 'lodash/uniq'
import {
    SET_AVAILABLE_APPOINTMENTS,
    SET_AVAILABLE_APPOINTMENTS_SUCCESSFUL,
    SET_AVAILABLE_APPOINTMENTS_FAILURE,

    GET_APPOINTMENTS,
    GET_APPOINTMENTS_SUCCESSFUL,
    GET_USER_APPOINTMENTS_SUCCESSFUL,

    GET_USER_APPOINTMENTS,

    GET_DATE_BOOKINGS,
    GET_DATE_BOOKINGS_SUCCESSFUL,
    GET_DATE_BOOKINGS_FAILURE,
} from './constants'

const defaultState = {
    loading: false,
    appointments: {},
    userAppointments: {},
}

const ACTION_HANDLERS = {
    [SET_AVAILABLE_APPOINTMENTS]: state => ({
        ...state,
        loading: true,
    }),

    [SET_AVAILABLE_APPOINTMENTS_SUCCESSFUL]: (state, { payload }) => {
        const markedAppointment = {
            [payload.day]: {...payload}
        }
        return {
            ...state,
            appointments: {...state.appointments, ...markedAppointment},
            loading: false,
        }
    },

    [SET_AVAILABLE_APPOINTMENTS_FAILURE]: (state, { error }) => ({
        ...state,
        error,
        loading: false,
    }),

    [GET_APPOINTMENTS]: state => ({
        ...state,
        loading: true,
    }),

    [GET_APPOINTMENTS_SUCCESSFUL]: (state, { payload }) => {
        const appointments = payload.reduce((result, filter) => {
            result[filter.day] = {...filter, marked: true};
            return result;
        },{});
        return {
            ...state,
            appointments: {...state.appointments, ...appointments},
            loading: false,
        }
    },

    [GET_USER_APPOINTMENTS]: state => ({
        ...state,
        loading: true,
    }),

    [GET_USER_APPOINTMENTS_SUCCESSFUL]: (state, { payload }) => {
        const appointments = payload.reduce((result, filter) => {
            result[filter.day] = {...filter, marked: true};
            return result;
        },{});
        return {
            ...state,
            userAppointments: {...state.userAppointments, ...appointments},
            loading: false,
        }
    },

    [GET_DATE_BOOKINGS]: state => ({
        ...state,
        loadingDateBookings: true,
    }),

    [GET_DATE_BOOKINGS_SUCCESSFUL]: (state, { payload }) => {
        const selectedDay = payload
        const from = selectedDay.from;
        const to = selectedDay.to;
        const start = moment(from, "H:mm");
        const end = moment(to, "H:mm");
        const bookings = payload.bookings;
        //get bookings
        //check if any of the items has a time in bookings
        //if it has, set booked to true
      
        const duration = moment.duration(end.diff(start)).asHours();
        let currentStartTime = start;
        const duration_in_30_minutes_interval = duration * 2
        const allBookings = []
        const unfilledBookings = []

        if(bookings.length <= 0) {
            for(let i = 1; i <= duration_in_30_minutes_interval; i++) {
                const metime = currentStartTime.add(30, 'm').format("H:mm")
                
                unfilledBookings.push({time: metime, height: 100, booked: false})
            }
        }else {
            for(let i = 1; i <= duration_in_30_minutes_interval; i++) {
                const metime = currentStartTime.add(30, 'm').format("H:mm")
                
                bookings.forEach((booking) => {
                    if(metime === booking.time) {
                        unfilledBookings.push({time: metime, height: 100, booked: true})
                    }else {
                        unfilledBookings.push({time: metime, height: 100, booked: false})
                    }
                })
            }
        }
        console.log('unfilledBookings', unfilledBookings)
        
        return {
            ...state,
            dayAppointment: {
                ...state.dayAppointment,
                appointment_id: payload._id,
                [payload.day]: [
                    //...payload,
                    ...unfilledBookings
                ],
            },
            loadingDateBookings: false,
        }
    },

}

export default function appointmentReducer(state = defaultState, action = {}) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state 
}