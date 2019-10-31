import * as actionType from '../actions/actionTypes';

const initialState = {
	users: []
};

export default (state = initialState, action) => {

	switch (action.type) {

		case actionType.SET_USERS:
			return { ...state,
				users: action.payload.users
			}

		default:
			return state;
	}
}
