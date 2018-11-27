import { AsyncStorage } from 'react-native';
import * as api from '../../helpers/api';
import {
	GET_BOOKINGS,
	GET_BOOKINGS_SUCCESSFUL,
	GET_BOOKINGS_FAILURE,
} from './constants';


const fetchBookingsSuccessful = bookings => ({ type: GET_BOOKINGS_SUCCESSFUL, payload: bookings })
const fetchBookingsFailure = error => ({ type: GET_BOOKINGS_FAILURE, error, })



export const fetchBookings = (bookingType) => async dispatch => {
    dispatch({type: GET_BOOKINGS})
	try {
		const token = await AsyncStorage.getItem('authToken');
		return api.getBookings(token, bookingType)
			.then(response => {
				if (response.success) {
                    dispatch(fetchBookingsSuccessful(response.bookings));
					
				} else {
                    dispatch(fetchBookingsFailure('Error fetching Bookings'));
				}
			})
			.catch(error => {
				dispatch(generalError(error));
			});
	} catch (error) {
		dispatch(asyncError(error));
    }
}

export const acceptBooking = (payload) => async dispatch => {
	dispatch({type: GET_BOOKINGS})
try {
	const token = await AsyncStorage.getItem('authToken');
	return api.acceptBooking(token, payload)
		.then(response => {
			if (response.success) {
				console.log('success', response)
									//dispatch(fetchBookingsSuccessful(response.bookings));
				
			} else {
									// dispatch(fetchBookingsFailure('Error fetching Bookings'));
			}
		})
		.catch(error => {
			dispatch(generalError(error));
		});
} catch (error) {
	dispatch(asyncError(error));
	}
}
