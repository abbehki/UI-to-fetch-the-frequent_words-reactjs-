import { takeEvery } from 'redux-saga/effects';
import ACTION from './action_constants';
import {check_frequencyof} from './checkfrequency/check_saga';


export default function* rootSaga() {
  yield takeEvery(ACTION.CHECK.LOAD, check_frequencyof);
}