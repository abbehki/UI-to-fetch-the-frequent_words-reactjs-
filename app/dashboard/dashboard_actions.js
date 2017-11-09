import { delay } from 'redux-saga';
import { call,put, takeEvery,select} from 'redux-saga/effects';
import {PostDataWithOutToken,postDataWithToken,getDataWithToken} from '../util/ajax';
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

function* getFolderList(action) {
  try {   
    const folderListData = yield call(getDataWithToken, API.getfolderList , action.data.params);
    yield put({type : "STORE_FOLDER_LIST", data : folderListData });     
   
  } catch (e) {
    yield put({type : "ERROR", error : e.error});
  }
}

function* getFolderDetail(action) {
  // try {   
    const folderDetailData = yield call(getDataWithToken, API.getfolderList +"?parentId="+action.data);
    yield put({type : "STORE_FOLDER_DETAIL", data : folderDetailData });     
   
  // } catch (e) {
  //   yield put({type : "ERROR", error : e.error});
  // }
}


export {
  createFolder,
  getFolderList,
  getFolderDetail
};
