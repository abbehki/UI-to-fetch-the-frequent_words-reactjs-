import { delay } from 'redux-saga';
import { call,put, takeEvery,select} from 'redux-saga/effects';
import {PostDataWithOutToken,postDataWithToken,getDataWithToken,postMulitipartDataWithToken,PatchDataWithToken} from '../../util/ajax';
import API from '../../api_config';
import { browserHistory } from 'react-router';
import ACTION from '../../action_constants';
import CONSTANTS from '../../common_constants';
import {storeSessionOnCookie, getSessionData} from '../../util/common';
import cookie from '../../util/cookie';
import history from '../../history';



function* search_filter(action) {
  try {   
     const filterdetail = yield call(getDataWithToken, API.searching_filter +"?fileFormat="+action.data.fileFormat+'&directoryId='+action.data.Id+'&platform='+action.data.Plateform+'&height='+action.data.height+'&width='+action.data.width+'&search='+action.data.search+'&sort='+action.data.Date);
    //  yield put({type : "FILEDATA", data : filesDetailData });     
    console.log("Filter details",filterdetail)   
  } catch (e) {
    yield put({type : "ERROR", error : e.error});
  }
}
function* search_project(action) {
  try {   
    if(action.data==""){
     yield put({type : ACTION.SEARCH.FOLDERLIST, data : {} });
  }
     const search_project = yield call(getDataWithToken, API.searching_project+action.data);
     yield put({type : "SEARCH_PROJECT", data : search_project });
  } catch (e) {
    yield put({type : "ERROR", error : e.error});
  }
}
function* getProjectList(action) {
  try { 
    const folderListData = yield call(getDataWithToken, API.getfolderList , action.data.params);
    yield put({type : "STORE_FOLDER_LIST", data : folderListData });   
  } catch (e) {
    yield put({type : "ERROR", error : e.error});
  }
}  

export {
    search_filter,
    search_project,
    getProjectList
};

