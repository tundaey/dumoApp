import { combineReducers } from 'redux'
import authReducer from './auth/auth.reducer'
import profileReducer from './profile/reducer'
import searchReducer from './search/reducer'
import errorReducer from './error/reducer'
import appointmentReducer from './appointments/reducer'
import bookingReducer from './bookings/reducer'


export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    search: searchReducer,
    error: errorReducer,
    appointments: appointmentReducer,
    bookings: bookingReducer,
})