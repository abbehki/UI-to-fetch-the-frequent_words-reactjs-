import { combineReducers } from 'redux';
import about from './about/about_reducer';
import auth from './auth/auth_reducer';

const rootReducers = combineReducers({
  about,
  auth
});

export default rootReducers;