import { AsyncStorage } from 'react-native';
// import { asyncError } from '../errors/error.reducer';
// import App from '../../app';
// import config from '../../config';

import { store } from '../../../App';

// Actions
export const connectionError = error => {
	return {
		type: 'CONNECTION_ERROR',
		error
	};
};
export const showError = error => {
	return {
		type: 'SHOW_ERROR',
		error
	};
};
export const removeError = () => {
	return {
		type: 'REMOVE_ERROR'
	};
};

// token errors handled here to keep out of service files
export const handleTokenErrors = response => {
	console.log('reached')
	if (!response.success) {
		console.log('not successful', response)
		if (response.code && response.code === 'invalidToken') {
			store.dispatch({ type: 'INVALID_TOKEN' });
		} else if (response.code && response.code == 'refreshExpired') {
			store.dispatch({ type: 'REFRESH_EXPIRED' });
			store.dispatch(connectionError('Refresh token expired.'));
		}
	}
	return response;
};

// general errors are for non-request specific problems that can occur with
// many requests, such as network errors and app specific, general errors
export const generalError = response => {
	if (response == 'TypeError: Network request failed') {
		return store.dispatch(connectionError('Network request failed'));
		// other checks for connection issues
	} else {
		// generic errors
	}
};

