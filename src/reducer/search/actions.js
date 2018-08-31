import { AsyncStorage } from 'react-native';
import * as api from '../../helpers/api';
import { SEARCH_APPOINTMENTS, SEARCH_APPOINTMENTS_SUCCESSFUL, SEARCH_APPOINTMENTS_FAILURE, GET_USERS} from './constants';

function searchAppointmentSuccessful(appointments) {
    return {
        type: SEARCH_APPOINTMENTS_SUCCESSFUL,
        payload: appointments
    }
}

function searchAppointmentFaillure(error) {
    return {
        type: SEARCH_APPOINTMENTS_FAILURE,
        error,
    }
}


export const searchAppointments = (searchParams) => async dispatch => {
    dispatch({type: SEARCH_APPOINTMENTS})
	try {
		const token = await AsyncStorage.getItem('authToken');
		return api.searchAppointments(searchParams, token)
			.then(response => {
                console.log('search response', response)
				if (response.success) {
                    dispatch(searchAppointmentSuccessful(response.results));
					
				} else {
                    console.log('Error: ', response);
                    dispatch(searchAppointmentFaillure(error))
                    //dispatch(updateProfileFailure('Error updating profile'))
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

export const getUsers = () => async dispatch => {
    dispatch({type: GET_USERS})
	try {
		const token = await AsyncStorage.getItem('authToken');
		return api.getUsers(token)
			.then(response => {
                console.log('search response', response)
				if (response.success) {
                    dispatch(searchAppointmentSuccessful(response.appointments));
					
				} else {
                    console.log('Error: ', response);
                    dispatch(searchAppointmentFaillure(error))
                    //dispatch(updateProfileFailure('Error updating profile'))
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