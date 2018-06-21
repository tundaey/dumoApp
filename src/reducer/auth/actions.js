import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import * as api from '../../helpers/api'

export const SET_AUTH_PENDING = 'SET_AUTH_PENDING';
export const SET_LOGIN_SUCCESS = 'SET_LOGIN_SUCCESS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_REGISTER_SUCCESS = 'SET_REGISTER_SUCCESS';
export const SET_REGISTER_ERROR = 'SET_REGISTER_ERROR';
export const SET_LOGOUT = 'SET_LOGOUT';
export const SAVE_APP_TOKEN = 'SAVE_APP_TOKEN';
export const INVALID_TOKEN = 'INVALID_TOKEN';
export const REFRESHING_TOKEN = 'REFRESHING_TOKEN';
export const TOKEN_REFRESHED = 'TOKEN_REFRESHED';

// Actions
export const setAuthPending = () => {
	return {
		type: 'SET_AUTH_PENDING'
	};
};
export const setLoginSuccess = (authToken, refreshToken) => {
	return {
		type: 'SET_LOGIN_SUCCESS',
		authToken,
		refreshToken
	};
};
export const setLoginError = loginError => {
	return {
		type: 'SET_LOGIN_ERROR',
		loginError
	};
};
export const setRegisterSuccess = (authToken, refreshToken) => {
	return {
        type: 'SET_REGISTER_SUCCESS',
        authToken,
		refreshToken
	};
};
export const setRegisterError = regError => {
	return {
		type: 'SET_REGISTER_ERROR',
		regError
	};
};
export const setLogout = () => {
	return {
		type: 'SET_LOGOUT'
	};
};
export const saveAppToken = authToken => {
	return {
		type: 'SAVE_APP_TOKEN',
		authToken
	};
};

const _saveItem = async (item, selectedValue) => {
	try {
		await AsyncStorage.setItem(item, selectedValue);
	} catch (error) {
		throw error;
	}
};

export const logout = () => async dispatch => {
    dispatch(setLogout());
    return AsyncStorage.removeItem('authToken');
	// try {
	// 	await AsyncStorage.removeItem('authToken');
	// 	// App.startApp();
	// } catch (error) {
	// 	dispatch(asyncError(error));
	// }
};

export const refreshToken = refreshToken => dispatch => {
	return api.refreshToken(refreshToken)
		.then(response => {
			if (response.success) {
				dispatch(AuthReducer.saveAppToken(response.authToken));
				_saveItem('authToken', response.authToken)
					.then(resp => {
						console.log('Refresh finished');
					})
					.catch(error => {
						dispatch(asyncError(error));
					});
			}
		})
		.catch(error => {
			dispatch(generalError(error));
		});
};

// used on app startup
export const checkAuthStatus = () => async dispatch => {
	try {
		const authToken = await AsyncStorage.getItem('authToken');
		const refreshToken = await AsyncStorage.getItem('refreshToken');
		if (authToken != null && refreshToken != null) {
			dispatch(setLoginSuccess(authToken, refreshToken));
		}
		return authToken;
	} catch (error) {
		dispatch(asyncError(error));
	}
};


export const register = (email, password, account_type) => dispatch => {
	dispatch(setAuthPending());
	return api.register(email, password, account_type)
		.then(response => {
            console.log(response);
			if (response.success) {
                dispatch(setRegisterSuccess(response.authToken, response.refreshToken));
                return _saveItem('authToken', response.authToken)
					.then(resp => {
						return _saveItem('refreshToken', response.refreshToken)
							.then(resp => {
								return response;
							})
							.catch(error => {
                                console.warn('error saving refresh token')
								dispatch(asyncError(error));
							});
					})
					.catch(error => {
                        console.warn('error saving auth token')
						dispatch(asyncError(error));
					});
			} else {
				dispatch(setRegisterError(response.message));
			}
		})
		.catch(error => {
            //dispatch(generalError(error));
            dispatch(setRegisterError(response.message));
		});
};

export const login = (email, password) => dispatch => {
	dispatch(setAuthPending());
	return api.login(email, password)
		.then(response => {
            console.log('returned response', response)
			if (response.success) {
				dispatch(
					setLoginSuccess(response.authToken, response.refreshToken)
				);
				return _saveItem('authToken', response.authToken)
					.then(resp => {
						return _saveItem('refreshToken', response.refreshToken)
							.then(resp => {
                                console.log('response', response)
								return response;
							})
							.catch(error => {
								dispatch(asyncError(error));
							});
					})
					.catch(error => {
						dispatch(asyncError(error));
					});
			} else {
				dispatch(setLoginError(response.message));
			}
		})
		.catch(error => {
			dispatch(generalError(error));
		});
};

//test function on the login and logged in areas to show the JWT is working
export const checkAuthTest = () => async dispatch => {
	try {
		const token = await AsyncStorage.getItem('authToken');
		return api.checkAuthTest(token)
			.then(response => {
				if (response.success) {
					console.log('Success: ', response.message);
				} else {
					console.log('Error: ', response);
				}
			})
			.catch(error => {
				dispatch(generalError(error));
			});
	} catch (error) {
		dispatch(asyncError(error));
	}
};