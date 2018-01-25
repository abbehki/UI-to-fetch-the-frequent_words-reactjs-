import { takeEvery } from 'redux-saga/effects';
import ACTION from './action_constants';
import {about} from './about/about_saga';


export default function* rootSaga() {
  yield takeEvery(ACTION.ABOUT.GETABOUT, about);
}