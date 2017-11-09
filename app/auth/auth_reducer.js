import ACTION from '../action_constants';
import {storeSessionOnCookie, getSessionData} from '../util/common';

function auth(state = getSessionData() , action) {
  let tempState = Object.assign({},state);
  switch (action.type) {
    case 'STORE_SIGNIN_DETAILS' :
          tempState.userData = action.data;
          storeSessionOnCookie(action.data);
          console.log(action.data);
          return tempState;

    case  'AUTH_ERROR':
          tempState.authError = action.data;         
          return tempState;

    default:
      return state;
  }
}

export default auth;