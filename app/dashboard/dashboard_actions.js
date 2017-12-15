import { delay } from 'redux-saga';
import { call,put, takeEvery,select} from 'redux-saga/effects';
import {PostDataWithOutToken,postDataWithToken,getDataWithToken,postMulitipartDataWithToken,PatchDataWithToken,getDataWithoutToken} from '../util/ajax';
import API from '../api_config';
import { browserHistory } from 'react-router';
import ACTION from '../action_constants';
import CONSTANTS from '../common_constants';
import {storeSessionOnCookie, getSessionData} from '../util/common';
import cookie from '../util/cookie';
import history from '../history';


function* createFolder(action) {
  try {   
    const folderData = yield call(postDataWithToken, API.folderCreate , action.data.paramObj);
    yield put({type : "STORE_FOLDER_DETAILS", data : folderData });     
   
  } catch (e) {
    yield put({type : "ERROR", error : e.error});
  }
}

function* profile(action) {
  try {   
    const profileDetail = yield call(getDataWithoutToken, API.profiledetail+action.data);
    yield put({type : "PROFILE_DETAILS", data : profileDetail });     
   
  } catch (e) {
    yield put({type : "ERROR", error : e.error});
  }
}

function* getFolderList(action) {
  try { 
    const folderListData = yield call(getDataWithToken, API.getfolderList , action.data.params);
    yield put({type : "STORE_FOLDER_LIST", data : folderListData });  
       
   
  } catch (e) {
    yield put({type : "ERROR", error : e.error});
  }
}        

var i=1;
function* uploadImg(action) {
  try {  
    const uploadImdData = yield call(postMulitipartDataWithToken, API.uploadImg , action.data.data);    
    if(i<action.data.totalfilelength){
      yield put({type : "IMG_DATA", data : {data:uploadImdData,countOffie:i}});  
      ++i; 
    }else if(i==action.data.totalfilelength){
      yield put({type : "IMG_DATA", data : {data:uploadImdData,countOffie:i}});          
      i=1;
    }
  } catch (e) {
    yield put({type : "ERROR-Image", error : e.error});
  }
}


function* getFolderDetail(action) {
  try {   
    const folderDetailData = yield call(getDataWithToken, API.getfolderList +"?parentId="+action.data);
    yield put({type : "STORE_FOLDER_DETAIL", data : folderDetailData });     
   
  } catch (e) {
    yield put({type : "ERROR", error : e.error});
  }
}

function* changebool(action) {
  try {
    yield put({type : "CHANGEBOOL_CANCEL", data : false })
    
  } catch (e) {
    console.error("error",e.message);
  }
}
function* filelength(action) {
  try {
    yield put({type : "FILE_LENGTH", data : action.data })    
  } catch (e) {
    console.error("error",e.message);
  }
}
function* renamefolder(action) {
  try {
    const renamefolder = yield call(PatchDataWithToken, API.renamefolder,action.data);
    yield put({type : "RENAME", data : renamefolder });    
    yield put({type : ACTION.DASHBOARD.FOLDERLIST,data : false});        
  
   } catch (e) {
    console.error("error",e.message);
  }
}
function* deletefolder(action) {
  try {
    const deletefolder = yield call(PatchDataWithToken, API.deletefolders,action.data.data);
     yield put({type : "DELETE_SHOW", data : deletefolder });
     yield put({type : ACTION.DASHBOARD.FOLDERLIST,data :false});  
     yield put({type : ACTION.DASHBOARD.FOLDERDETAIL,data : action.data.parentDirectoryId});     
     
  } catch (e) {
    console.error("error delete:-",e.message);
  }finally{
   
  }
}
function* search_tags(action) {
  try {
    const searched_tags = yield call(getDataWithToken, API.searching_tags+'?search='+action.data);
    yield put({type : "SEARCHED_TAGS", data : searched_tags });
  } catch (e) {
    console.error("error delete:-",e.message);
  }
}
export {
  createFolder,
  getFolderList,
  getFolderDetail,
  changebool,
  deletefolder,
  renamefolder,
  search_tags,
  uploadImg,
  filelength,
  profile
};

