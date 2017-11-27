import ACTION from '../action_constants';
import {storeSessionOnCookie, getSessionData} from '../util/common';

function multiplefile(state = getSessionData() , action) {
  let tempState = Object.assign({},state);
  switch (action.type) {
    case 'STORE_FOLDER_DETAILS' :
          tempState.folderData = action.data.data;        
          console.log( tempState.folderData);
          return tempState;
          
    case 'STORE_FOLDER_LIST' :
          tempState.folderArray = action.data.data;        
          console.log( tempState.folderArray);
          return tempState; 

    case 'STORE_FOLDER_DETAIL' :
          tempState.folderDetail = action.data.data;        
          console.log( tempState.folderDetail);
          return tempState;      

    case  'ERROR':
          tempState.folderError = action.error;         
          return tempState;

    default:
      return state;
  }
}

export default multiplefile;