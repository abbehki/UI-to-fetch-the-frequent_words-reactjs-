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
     const filesDetailData = yield call(getDataWithToken, API.getfolderList +"?parentId="+action.data);
     yield put({type : "FILEDATA", data : filesDetailData });     
   
  } catch (e) {
    yield put({type : "ERROR", error : e.error});
  }
}

export {

    search_filter,
 
};

