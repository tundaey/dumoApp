import * as api from '../../helpers/api';
import { SEARCH_APPOINTMENTS, SEARCH_APPOINTMENTS_SUCCESSFUL, SEARCH_APPOINTMENTS_FAILURE} from './constants';

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

export function searcAppointments(searchParams) {
    return (dispatch) => {
        dispatch({type: SEARCH_APPOINTMENTS})
        api.searchAppointments(searchParams)
        .then(data => dispatch(searchAppointmentSuccessful(data)))
        .catch(error => dispatch(searchAppointmentFaillure(error)))
    }
}