import ACTION from '../action_constants';
import {storeSessionOnCookie, getSessionData} from '../util/common';

function dashboard(state = getSessionData() , action) {
  let tempState = Object.assign({},state);
  switch (action.type) {
    case 'STORE_FOLDER_DETAILS' :
          tempState.folderData = action.data.data;        
          console.log( "Folderdetails:-",tempState.folderData);
          return tempState;
          
    case 'STORE_FOLDER_LIST' :
          tempState.folderArray = action.data.data;        
          console.log( "Folderarray:-",tempState.folderArray);
          return tempState; 

    case 'STORE_FOLDER_DETAIL' :
          tempState.folderDetail = action.data.data;        
          console.log( "Folderdetail:-",tempState.folderDetail);
          return tempState;     

    case 'CHANGEBOOL_CANCEL' :
          tempState.changebool_cancel = action.data;        
          console.log(tempState.changebool_cancel);
          return tempState;  

    case 'DELETE_SHOW' :
          tempState.delete_folder = action.data;
          tempState.changestate_smallpopup=false;             
          tempState.changestate_success=true;  
          console.log(tempState.delete_folder);
          return tempState;  
           
    case 'CLOSE_CREATEFOLDER' :
          tempState.folderData=false;             
          return tempState; 

    case 'DELETE_NOSHOW' :
          tempState.delete_folder = action.data;
          tempState.changestate_smallpopup=false;   
          tempState.changestate_success=false;  
          return tempState;  
           
    case  'ERROR':
          tempState.folderError = action.error;         
          return tempState;

    default:
      return state;
  }
}

export default dashboard;