import * as actionType from '../actions/actionTypes';

const initialState = {
	users: []
};

export default (state = initialState, action) => {

	switch (action.type) {

		case actionType.SET_USERS:
			return { ...state, users: action.payload.users,};

		case actionType.RESET_TOASTER:
			return { ...state,
				open: false,
				variant: '',
				vertical: 'top',
				horizontal: 'center',
				message: null
			}

		default:
			return state;
	}
}
