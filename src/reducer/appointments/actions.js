import { AsyncStorage } from 'react-native';
import * as api from '../../helpers/api';
import {
    SET_AVAILABLE_APPOINTMENTS,
    SET_AVAILABLE_APPOINTMENTS_SUCCESSFUL,
    SET_AVAILABLE_APPOINTMENTS_FAILURE,
    GET_APPOINTMENTS,
    GET_APPOINTMENTS_SUCCESSFUL,
    GET_APPOINTMENTS_FAILURE,
    GET_USER_APPOINTMENTS,
    GET_USER_APPOINTMENTS_SUCCESSFUL,
    GET_USER_APPOINTMENTS_FAILURE,
    GET_DATE_BOOKINGS,
    GET_DATE_BOOKINGS_SUCCESSFUL,
    GET_DATE_BOOKINGS_FAILURE,
	INITIALIZE_PAYMENT_FOR_APPOINTMENT,
	INITIALIZE_PAYMENT_FOR_APPOINTMENT_SUCCESSFUL,
	INITIALIZE_PAYMENT_FOR_APPOINTMENT_FAILURE,
} from './constants';

function setAvailableAppointmentSuccessful(appointment) {
    return {
        type: SET_AVAILABLE_APPOINTMENTS_SUCCESSFUL,
        payload: appointment
    }
}

function setAvailableAppointmentFailure(error) {
    return {
        type: SET_AVAILABLE_APPOINTMENTS_FAILURE,
        error,
    }
}

const getAppointmentsSuccessful = appointments => ({ type: GET_APPOINTMENTS_SUCCESSFUL, payload: appointments })
const getAppointmentsFailure = error => ({ type: GET_APPOINTMENTS_FAILURE, error, })

const getUserAppointmentsSuccessful = appointments => ({ type: GET_USER_APPOINTMENTS_SUCCESSFUL, payload: appointments })
const getUserAppointmentsFailure = error => ({ type: GET_USER_APPOINTMENTS_FAILURE, error, })

const getDayAppointmentSuccessful = appointment => ({ type: GET_DATE_BOOKINGS_SUCCESSFUL, payload: appointment })
const getDayAppointmentFailure = error => ({ type: GET_DATE_BOOKINGS_FAILURE, error, })

const initializePaymentForAppointmentSuccessful = payload => (
	{
		type: INITIALIZE_PAYMENT_FOR_APPOINTMENT_SUCCESSFUL,
		payload,
	}
) 

const initializePaymentForAppointmentFailure = error => (
	{
		type: INITIALIZE_PAYMENT_FOR_APPOINTMENT_FAILURE,
		error,
	}
) 


export const setAvailableAppointment = (payload) => async dispatch => {
    dispatch({type: SET_AVAILABLE_APPOINTMENTS})
	try {
		const token = await AsyncStorage.getItem('authToken');
		return api.setAvailableAppointments(payload, token)
			.then(response => {
				if (response.success) {
                    dispatch(setAvailableAppointmentSuccessful(response.appointment));
					
				} else {
                    console.log('Error: ', response);
                    dispatch(setAvailableAppointmentFailure(error))
				}
			})
			.catch(error => {
				dispatch(generalError(error));
			});
	} catch (error) {
		dispatch(asyncError(error));
    }
}

export const getAppointments = (day) => async dispatch => {
    dispatch({type: GET_APPOINTMENTS})
	try {
		const token = await AsyncStorage.getItem('authToken');
		return api.getAppointments(day, token)
			.then(response => {
				if (response.success) {
                    dispatch(getAppointmentsSuccessful(response.appointments));
					
				} else {
                    dispatch(getAppointmentsFailure('Error fetching Appointments'));
				}
			})
			.catch(error => {
				dispatch(generalError(error));
			});
	} catch (error) {
		dispatch(asyncError(error));
    }
}

export const fetchUserAppointments = (user) => async dispatch => {
    dispatch({type: GET_USER_APPOINTMENTS})
	try {
		const token = await AsyncStorage.getItem('authToken');
		return api.getUserAppointments(user, token)
			.then(response => {
				if (response.success) {
                    dispatch(getUserAppointmentsSuccessful(response.appointments));
					
				} else {
                    dispatch(getUserAppointmentsFailure('Error fetching Appointments'));
				}
			})
			.catch(error => {
				dispatch(generalError(error));
			});
	} catch (error) {
		dispatch(asyncError(error));
    }
}

export const fetchDayBookings = (user, day) => async dispatch => {
    dispatch({type: GET_DATE_BOOKINGS})
	try {
		const token = await AsyncStorage.getItem('authToken');
		return api.getUserDayAppointments(user, day, token)
			.then(response => {
				if (response.success) {
                    dispatch(getDayAppointmentSuccessful(response.appointment));
					
				} else {
                    dispatch(getDayAppointmentFailure('Error fetching Bookings'));
				}
			})
			.catch(error => {
				dispatch(generalError(error));
			});
	} catch (error) {
		dispatch(asyncError(error));
    }
}

export const initializePaymentForAppointment = (payload) => async dispatch => {
    dispatch({type: INITIALIZE_PAYMENT_FOR_APPOINTMENT})
	try {
		const token = await AsyncStorage.getItem('authToken');
		return api.initializePaymentForAppointment(payload, token)
			.then(response => {
                console.log('response', response)
				if (response.success) {
                    dispatch(initializePaymentForAppointmentSuccessful(response.appointment));
					
				} else {
                    console.log('Error: ', response);
                    dispatch(initializePaymentForAppointmentFailure(error))
				}
			})
			.catch(error => {
				dispatch(generalError(error));
			});
	} catch (error) {
        console.log('errr', error);
		dispatch(asyncError(error));
    }
}