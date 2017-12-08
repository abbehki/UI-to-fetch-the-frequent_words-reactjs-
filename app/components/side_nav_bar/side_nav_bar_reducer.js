import ACTION from '../../action_constants';
import {storeSessionOnCookie, getSessionData} from '../../util/common';

function side_nav_bar(state = getSessionData() , action) {
  let tempState = Object.assign({},state);
  switch (action.type) {
    case 'FILEDATA' :
          tempState.folderData = action.data.data;        
          return tempState;

    case 'SEARCH_PROJECT' :
          tempState.search_project = action.data;   
          tempState.folderArray=false;
          return tempState;

    case 'STORE_FOLDER_LIST' :
          tempState.folderArray = action.data.data;        
          return tempState; 

    case 'FILTERDETAIL_FALSE' :
          tempState.filterdetail = false;        
          return tempState; 
      
    case 'FILTERDETAIL' :
          tempState.filterdetail= action.data;        
          return tempState; 

    case 'COUNTS_FILTER' :
          tempState.platform= action.data.platform;        
          tempState.fileformat=action.data.fileformats;         
          return tempState; 

    case 'GETFAVOURITE' :
          tempState.favourite= action.data;        
          return tempState;

    case  'ERROR':
          tempState.folderError = action.error;         
          return tempState;

    default:return state;
  }
}

export default side_nav_bar;