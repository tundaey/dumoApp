
//Reducer
let initialState = {
	error: false,
	errorMessage: null
};

export default function(state = initialState, action) {
	switch (action.type) {
	case 'CONNECTION_ERROR':
		return {
			...state,
			error: true,
			errorMessage: action.error
		};
	case 'SHOW_ERROR':
		return {
			...state,
			error: true,
			errorMessage: action.error
		};
	case 'REMOVE_ERROR':
		return {
			...state,
			error: false,
			errorMessage: null
		};

	default:
		return state;
	}
}