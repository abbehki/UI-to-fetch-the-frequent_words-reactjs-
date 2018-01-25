import { combineReducers } from 'redux';
import about from './about/about_reducer';

const rootReducers = combineReducers({
  about,
});

export default rootReducers;