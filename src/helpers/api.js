// import firebase from 'react-native-firebase';
import axios from 'axios';
import config from './config';
import { handleTokenErrors } from '../reducer/error/actions'

//const API_URL = 'https://dumo-api.herokuapp.com'
const API_URL = 'http://localhost:1140'

export function authenticateUser() {    
    return firebase.auth().currentUser
}

export function signInWithEmail(email, password) {
    return axios.post(`${API_URL}/signin`, { email, password })
    .then(data => console.log('data', data))
}


export function getUserData(token) {
    return fetch(`${API_URL}/api/auth/profile`, {
        method: 'GET',
        headers: {
            ...config.configHeaders,
            Authorization: 'Bearer ' + token
        },
    })
        .then(response => response.json())
        // .then(handleTokenErrors)
        .catch(error => {
            throw error;
        });
}


export function logOut() {
    return firebase.auth().signOut()
}

export function setDayAppointments(payload, token) {
    return fetch(`${API_URL}/api/auth/profile/appointments/${payload.day}`, {
        method: 'POST',
        headers: {
            ...config.configHeaders,
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        // .then(handleTokenErrors)
        .catch(error => {
            throw error;
        });
}

export function getDayAppointments(day, token) {
    return fetch(`${API_URL}/api/auth/profile/appointments/${day}`, {
        method: 'GET',
        headers: {
            ...config.configHeaders,
            Authorization: 'Bearer ' + token
        },
    })
        .then(response => response.json())
        // .then(handleTokenErrors)
        .catch(error => {
            throw error;
        });
}

export function searchAppointments(params, token) {
    return fetch(`${API_URL}/api/auth/appointments/search`, {
        method: 'POST',
        body: JSON.stringify({ params }),
        headers: {
            ...config.configHeaders,
            Authorization: 'Bearer ' + token
        },
    })
        .then(response => response.json())
        // .then(handleTokenErrors)
        .catch(error => {
            throw error;
        });
}

export function getUsers(token) {
    return fetch(`${API_URL}/api/auth/users`, {
        method: 'GET',
        headers: {
            ...config.configHeaders,
            Authorization: 'Bearer ' + token
        },
    })
        .then(response => response.json())
        // .then(handleTokenErrors)
        .catch(error => {
            throw error;
        });
}

export function setAvailableAppointments(params, token) {
    return fetch(`${API_URL}/api/auth/appointments/${params.date}`, {
        method: 'POST',
        body: JSON.stringify({ ...params }),
        headers: {
            ...config.configHeaders,
            Authorization: 'Bearer ' + token
        },
    })
        .then(response => response.json())
        // .then(handleTokenErrors)
        .catch(error => {
            throw error;
        });
}

export function getAppointments(day, token) {
    return fetch(`${API_URL}/api/auth/profile/appointments`, {
        method: 'GET',
        headers: {
            ...config.configHeaders,
            Authorization: 'Bearer ' + token
        },
    })
        .then(response => response.json())
        // .then(handleTokenErrors)
        .catch(error => {
            throw error;
        });
}

export function getUserAppointments(email, token) {
    return fetch(`${API_URL}/api/auth/user/${email}/appointments`, {
        method: 'GET',
        headers: {
            ...config.configHeaders,
            Authorization: 'Bearer ' + token
        },
    })
        .then(response => response.json())
        // .then(handleTokenErrors)
        .catch(error => {
            throw error;
        });
}

export function getUserDayAppointments(email, day, token) {
    return fetch(`${API_URL}/api/auth/appointments/${day}/${email}`, {
        method: 'GET',
        headers: {
            ...config.configHeaders,
            Authorization: 'Bearer ' + token
        },
    })
        .then(response => response.json())
        // .then(handleTokenErrors)
        .catch(error => {
            throw error;
        });
}

export function login(email, password) {
    return fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: config.configHeaders
    })
        .then(response => response.json())
        //.then(handleTokenErrors)
        // .catch(error => {
        //     throw error;
        // });
}

export function register(email, password, account_type) {
    return fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        body: JSON.stringify({ email, password, account_type }),
        headers: config.configHeaders
    })
        .then(response => response.json())
        // .then(handleTokenErrors)
        // .catch(error => {
        //     throw error;
        // });
}

export function refreshToken(refreshToken) {
    return fetch(`${API_URL}/api/auth/refreshToken`, {
        method: 'POST',
        body: JSON.stringify({ refreshToken: refreshToken }),
        headers: config.configHeaders
    })
        .then(response => response.json())
        .then(handleTokenErrors)
        .catch(error => {
            throw error;
        });
}


export function updateProfile(payload, token) {
    return fetch(`${API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
            ...config.configHeaders,
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        // .then(handleTokenErrors)
        .catch(error => {
            throw error;
        });
}

export const initializePaymentForAppointment = (payload, token) => {
    return fetch(`${API_URL}/api/auth/pay/create`, {
        method: 'POST',
        headers: {
            ...config.configHeaders,
            Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(payload),
    })
        .then(response => response.json())
        // .then(handleTokenErrors)
        .catch(error => {
            throw error;
        });
}

export function getBookings(token, type) {
    return axios.get(`${API_URL}/api/auth/bookings`, {
        headers: {
            ...config.configHeaders,
            Authorization: 'Bearer ' + token,
        },
        params: {
            type,
        }
    })
    .then((({ data }) => data))
    .catch(error => error)
}

export function acceptBooking(token, payload) {
    return axios.post(`${API_URL}/api/auth/bookings/accept`, {
        headers: {
            ...config.configHeaders,
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(payload),
    })
    .then((({ data }) => data))
    .catch(error => error)
}
