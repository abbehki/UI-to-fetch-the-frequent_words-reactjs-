
import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import ACTION from '../action_constants.js';
function* about(action) {
    yield delay(3000);
    yield put({type:ACTION.ABOUT.LOADABOUT});
}
export {
    about
};