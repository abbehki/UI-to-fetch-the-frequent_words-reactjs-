import ACTION from '../../action_constants';
import {storeSessionOnCookie, getSessionData} from '../../util/common';

function side_nav_bar(state = getSessionData() , action) {
  let tempState = Object.assign({},state);
  switch (action.type) {
    case 'FILEDATA' :
          tempState.folderData = action.data.data;        
          console.log( "FILEDATA:-",tempState.folderData);
          return tempState;

    case 'SEARCH_PROJECT' :
          tempState.search_project = action.data;   
          tempState.folderArray=false;
          console.log( "SEARCH_PROJECT:-",tempState.search_project);
          return tempState;

    case 'STORE_FOLDER_LIST' :
          tempState.folderArray = action.data.data;        
          console.log( "Folderarray:-",tempState.folderArray);
          return tempState; 

    case 'SEARCH_PROJECT_FAIL' :
          tempState.search_project = false;        
          return tempState; 


    case  'ERROR':
          tempState.folderError = action.error;         
          return tempState;

    default:return state;
  }
}

export default side_nav_bar;