import { AsyncStorage } from 'react-native';
import * as api from '../../helpers/api'

import {
    GET_DATA_FAILURE,
    GET_DATA_SUCCESS,
    LOADING_PROFILE,
    UPDATE_PROFILE,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_SUCCESS,
    SET_DAY_APPOINTMENTS,
    defaultAppointments,
    SAVE_APPOINTMENT,
    GET_DAY_APPOINTMENTS_SUCCESS,
    SET_DAY_APPOINTMENTS_SUCCESS
} from './constants'


function getUserDataSucessful(user) {
    return {
        type: GET_DATA_SUCCESS,
        user,
    }
}

function getUserDataFailure(error) {
    return {
        type: GET_DATA_FAILURE,
        error,
    }
}

function updateProfileSucessful(payload) {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload,
    }
}

function updateProfileFailure(error) {
    return {
        type: UPDATE_PROFILE_FAILURE,
        error,
    }
}

function getDayAppointmentsSuccess(appointments, day) {
    return {
        type: GET_DAY_APPOINTMENTS_SUCCESS,
        appointments,
        day,
    }
}

function setDayAppointmentsSuccess(appointment, day) {
    console.log('set appoitnment success', appointment)
    return {
        type: SET_DAY_APPOINTMENTS_SUCCESS,
        appointment,
        day,
    }
}

export const getUserData = () => async dispatch => {
    console.log('get user data')
    dispatch({type: LOADING_PROFILE})
    try {
        const token = await AsyncStorage.getItem('authToken');
        return api.getUserData(token)
            .then(response => {
                if (response.success) {
                    console.log('user profile', response)
                    dispatch(getUserDataSucessful(response.user))
                } else {
                    dispatch(getUserDataFailure("Error fetching User Data"))
                }
            } )
        .catch(error => dispatch(getUserDataFailure(error)))
    } catch (error) {
        dispatch(getUserDataFailure("Error fetching User Data"))
    }
}

export const updateProfile = (payload) => async dispatch => {
	try {
		const token = await AsyncStorage.getItem('authToken');
		return api.updateProfile(payload, token)
			.then(response => {
				if (response.success) {
                    console.log('user', response.user)
					dispatch(updateProfileSucessful(response.user));
				} else {
                    console.log('Error: ', response);
                    dispatch(updateProfileFailure('Error updating profile'))
				}
			})
			.catch(error => {
				dispatch(generalError(error));
			});
	} catch (error) {
		dispatch(asyncError(error));
    }
}

export const setDayAppointments = (day, time, available, newAppointments) => async dispatch => {
    console.log('day', day, time, available)
	try {
        const token = await AsyncStorage.getItem('authToken');
        const payload = { day, time, available };
		return api.setDayAppointments(payload, token)
			.then(response => {
				if (response.success) {
                    console.log('appoitnment', response.appointment);
                    dispatch(setDayAppointmentsSuccess(payload, day))
					// dispatch(getDayAppointments(day));
				} else {
                    console.log('Error: ', response);
                    //dispatch(updateProfileFailure('Error updating profile'))
				}
			})
			.catch(error => {
				dispatch(generalError(error));
			});
	} catch (error) {
		//dispatch(asyncError(error));
    }
}


export const getDayAppointments = (day) => async dispatch => {
	try {
		const token = await AsyncStorage.getItem('authToken');
		return api.getDayAppointments(day, token)
			.then(response => {
                console.log('response', response)
				if (response.success) {
                    dispatch(getDayAppointmentsSuccess(response.appointments, day));
					
				} else {
                    console.log('Error: ', response);
                    //dispatch(updateProfileFailure('Error updating profile'))
				}
			})
			.catch(error => {
				dispatch(generalError(error));
			});
	} catch (error) {
		dispatch(asyncError(error));
    }
}
