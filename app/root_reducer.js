import { combineReducers } from 'redux';
import check_reducer from './checkfrequency/check_reducer';

const rootReducers = combineReducers({
  check_reducer,
});

export default rootReducers;