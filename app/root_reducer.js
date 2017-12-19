import { combineReducers } from 'redux';
import about from './about/about_reducer';
import auth from './auth/auth_reducer';
import dashboard from './dashboard/dashboard_reducer';
import fileupload from './multiplefile/multiplefile_reducer';
import side_nav_bar from './components/side_nav_bar/side_nav_bar_reducer';


const rootReducers = combineReducers({
  about,
  auth,
  dashboard,
  fileupload,
  side_nav_bar,
});

export default rootReducers;