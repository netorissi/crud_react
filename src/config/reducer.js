import { combineReducers } from 'redux';
import rdToaster from '../reducers/toaster';
import rdUser from '../reducers/user';

export default combineReducers({
	rdToaster,
	rdUser
});
