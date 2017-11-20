import { delay } from 'redux-saga';
import { call,put, takeEvery,select} from 'redux-saga/effects';
import {GetData,PostData,PostDataWithOutToken} from '../util/ajax';
import API from '../api_config';
import { browserHistory } from 'react-router';
import ACTION from '../action_constants';
import CONSTANTS from '../common_constants';
import {storeSessionOnCookie, getSessionData} from '../util/common';
import cookie from '../util/cookie';
import history from '../history';


function* signin(action) {
  try {   
    const signInData = yield call(PostDataWithOutToken, API.signIn , action.data.paramObj);
    yield put({type : "STORE_SIGNIN_DETAILS", data : signInData });
      history.push('/dashboard');     
   
  } catch (e) {
    console.log("error--->",e.responseJSON.errorMessage)
    yield put({type : "AUTH_ERROR", data :e.responseJSON.errorMessage});
  }
}


export {signin};
