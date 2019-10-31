import { combineReducers } from 'redux';
import rdToaster from '../reducers/toaster';
import rdUsers from '../reducers/users';

export default combineReducers({
	rdToaster,
	rdUsers
});
