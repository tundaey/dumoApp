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
    // return firebase.auth().signInWithEmailAndPassword(email, password)
    // .then(({ _user }) => getUserData(_user.uid))
    // .catch(error => ({error: 'There was an error signing in. Please try again'}))
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

export function saveAppointment(appointment) {
    return firebase.firestore().collection('bookings').add(appointment)
    //return firebase.database().ref(`bookings`).push(appointment)
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

export function searchAppointments(params) {
    console.log('params', params)
    return firebase.firestore().collection('bookings')
    .where("day", "==", params.date)
    .where("time", "==", params.time)
    //.where("account_type", "==", "trainer")
    .get()
    .then(data => data.docs)
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
    console.log('updated profile', payload, token)
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
