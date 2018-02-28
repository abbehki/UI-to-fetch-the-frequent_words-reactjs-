import { delay } from 'redux-saga';
import {call,put, takeEvery,select} from 'redux-saga/effects';
import {getDataWithoutToken} from '../util/ajax';
import API from '../api_config';
import { browserHistory } from 'react-router';
import ACTION from '../action_constants';
import CONSTANTS from '../common_constants';
import history from '../history';


function* check_frequencyof(action) {
    try{
        const result = yield call(getDataWithoutToken, API.FrequencyOfTxtFile+action.data);
        yield put({type : "RESULT", data : result});
    }catch (e) {
        console.error("error",e.message);
      }
   
}
export {
    check_frequencyof
};