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

   case  'PROFILE_DETAILS' :
          tempState.profile_detail = action.data;    
          tempState.user_name=action.data.name;
          localStorage.setItem("name", action.data.name);
          localStorage.setItem("profile", action.data.picture);
          
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
          tempState.response = action.data.data;
          tempState.changestate_smallpopup=false;             
          tempState.changestate_success=true;  
          return tempState;  
           
    case 'CLOSE_CREATEFOLDER' :
          tempState.folderData=false;     
          tempState.search_flag=false;   
          return tempState; 
          
    case 'CLOSE_CREATEFILES' :
          tempState.search_flag=false;            
          tempState.folderArray = false;    
          tempState.folderDetail=false;                
          return tempState; 

    case 'IMG_DATA' :
          tempState.fileUrl=action.data.data;
          tempState.countoffile=action.data.countOffie;            
          return tempState;

    case 'DELETE_NOSHOW' :
          tempState.delete_folder = action.data;
          tempState.changestate_smallpopup=false;   
          tempState.changestate_success=false;  
          return tempState;         
           
    case 'RENAME' :
          tempState.response = action.data.data;
          tempState.changestate_success=true;  
          tempState.rename=false;
          return tempState;  
           
    case 'SEARCHED_TAGS' :
          tempState.search_content = action.data.data;
          tempState.search_flag = true;     
          return tempState;FILE_LENGTH

    case 'FILE_LENGTH' :
          tempState.file_length = action.data;
          tempState.changebool_cancel=true;
          return tempState;

    case  'ERROR':
          tempState.folderError = action.error;         
          return tempState;

    default:return state;
  }
}

export default dashboard;