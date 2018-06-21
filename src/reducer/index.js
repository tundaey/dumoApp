import { combineReducers } from 'redux'
import authReducer from './auth/auth.reducer'
import profileReducer from './profile/reducer'
import searchReducer from './search/reducer'
import errorReducer from './error/reducer'

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    search: searchReducer,
    error: errorReducer,
})