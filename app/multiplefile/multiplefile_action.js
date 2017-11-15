import { delay } from 'redux-saga';
import { call,put, takeEvery,select} from 'redux-saga/effects';
import {PostDataWithOutToken,postDataWithToken,getDataWithToken} from '../util/ajax';
import API from '../api_config';
import { browserHistory } from 'react-router';
import ACTION from '../action_constants';
import CONSTANTS from '../common_constants';
import {storeSessionOnCookie, getSessionData} from '../util/common';
import history from '../history';


function* uploadfiles(action) {
  try {
    let formData=new FormData();
    for(let i=1;i<action.data.length;i++)
    {
      formData.append('image'+[i], action.data[i]);    
    }  
    // const folderData = yield call(postDataWithToken, API.folderCreate , action.data.paramObj);
    // yield put({type : "STORE_FOLDER_DETAILS", data : folderData });     
    for (var pair of formData.entries()) {
      console.log(pair); 
  }
  } catch (e) {
    console.error("error",e.message);
   // yield put({type : "ERROR", error : e.error});
  }
}



export {
  uploadfiles,
};
