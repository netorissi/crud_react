import * as actionType from '../actions/actionTypes';

const initialState = {
	open: false,
	variant: '',
	vertical: 'top',
	horizontal: 'center',
	message: '',
};

export default (state = initialState, action) => {

	switch (action.type) {

		case actionType.SET_TOASTER:
			return { ...state,
				open: true,
				variant: action.payload.variant,
				vertical: action.payload.vertical,
				horizontal: action.payload.horizontal,
				message: action.payload.message
			};

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
