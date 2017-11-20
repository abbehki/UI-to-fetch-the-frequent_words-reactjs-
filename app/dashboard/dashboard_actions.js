import { delay } from 'redux-saga';
import { call,put, takeEvery,select} from 'redux-saga/effects';
import {PostDataWithOutToken,postDataWithToken,getDataWithToken,postMulitipartDataWithToken,PatchDataWithToken} from '../util/ajax';
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
    console.log(folderData);
    yield put({type : "STORE_FOLDER_DETAILS", data : folderData });     
   
  } catch (e) {
    yield put({type : "ERROR", error : e.error});
  }
}

function* getFolderList(action) {
  try { 
    const folderListData = yield call(getDataWithToken, API.getfolderList , action.data.params);
    console.log("folderlist we have:-",folderListData)
    yield put({type : "STORE_FOLDER_LIST", data : folderListData });  
       
   
  } catch (e) {
    yield put({type : "ERROR", error : e.error});
  }
}        


function* uploadImg(action) {
  // try {   
    const uploadImdData = yield call(postMulitipartDataWithToken, API.uploadImg , action.data);
    yield put({type : "IMG_DATA", data : uploadImdData });     
   
  // } catch (e) {
  //   yield put({type : "ERROR", error : e.error});
  // }
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
   // yield put({type : "ERROR", error : e.error});
  }
}
function* deletefolder(action) {
  try {
    const deletefolder = yield call(PatchDataWithToken, API.deletefolders,action.data);
     yield put({type : "DELETE_SHOW", data : deletefolder });
     yield put({type : ACTION.DASHBOARD.FOLDERLIST,data : {}});
     
     
     
  } catch (e) {
    console.error("error delete:-",e.message);
   // yield put({type : "ERROR", error : e.error});
  }finally{
   
  }
}

export {
  createFolder,
  getFolderList,
  getFolderDetail,
  changebool,
  deletefolder,
  uploadImg
};

