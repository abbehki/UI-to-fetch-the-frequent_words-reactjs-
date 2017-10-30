import ACTION from '../action_constants';
import {storeSessionOnCookie, getSessionData} from '../util/common';

function auth(state = getSessionData() , action) {
  let tempState = Object.assign({},state);
  switch (action.type) {
    case 'STORE_SIGNIN_DETAILS' :
          tempState.userData = action.data;
          storeSessionOnCookie(action.data);
          console.log( tempState.userData);
          return tempState;

    default:
      return state;
  }
}

export default auth;