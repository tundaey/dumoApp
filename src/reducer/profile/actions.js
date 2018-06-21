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
    GET_DAY_APPOINTMENTS_SUCCESS
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

function getDayAppointmentsSuccess(appointments) {
    return {
        type: GET_DAY_APPOINTMENTS_SUCCESS,
        appointments,
    }
}

function setDayAppointmentsSuccess(day, appointment) {
    return {
        type: SET_DAY_APPOINTMENTS,
        day,
        appointment
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

export const setDayAppointments = (day, time, available) => async dispatch => {
    console.log('day', day, time, available)
	try {
        const token = await AsyncStorage.getItem('authToken');
        const payload = { day, time, available };
		return api.setDayAppointments(payload, token)
			.then(response => {
				if (response.success) {
                    console.log('appoitnment', response);
					dispatch(getDayAppointments(day));
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


// export function setDayAppointments(day, appointments) {
//     return (dispatch) => {
//         console.log('heyyy', day, appointments)
//         dispatch(setDayAppointmentsSuccess(day, appointments))
//         api.setDayAppointments(day, appointments)
//         .then(()=> console.log('success'))
//         .catch(()=> console.warn('fail'))
//     }
// }

function saveAppointmentSuccess() {
    return {
        type: SAVE_APPOINTMENT
    }
}

export function saveAppointment(appointment) {
    return (dispatch, getState) => {
        console.log('save appointment', appointment, getState().profile.profile)
        
        const uid = getState().profile.profile.uid
        api.getUserData(uid)
        .then(data => {
            appointment['account_type'] = data.account_type
            appointment['price'] = data.price
            appointment['uid'] = data.uid
            appointment['gender'] = data.gender
            appointment['first_name'] = data.first_name
            appointment['last_name'] = data.last_name
            appointment['avatar'] = data.avatar
            return appointment
        })
        .then(newAppointment => api.saveAppointment(newAppointment))
        .then(()=> dispatch(saveAppointmentSuccess()))
        .catch(()=> console.warn('fail'))
    }
}

export const getDayAppointments = (day) => async dispatch => {
	try {
		const token = await AsyncStorage.getItem('authToken');
		return api.getDayAppointments(day, token)
			.then(response => {
                console.log('response', response)
				if (response.success) {
                    console.log('appoitnments length', response.appointments.length)
                    if (response.appointments.length <= 0) {
                        dispatch(getDayAppointmentsSuccess(defaultAppointments));
                    } else {
                        dispatch(getDayAppointmentsSuccess(response.appointments));
                    }
					
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
