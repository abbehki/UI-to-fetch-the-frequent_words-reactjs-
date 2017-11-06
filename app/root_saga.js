import { takeEvery } from 'redux-saga/effects';
import ACTION from './action_constants';
import {about} from './about/about_saga';
import {signin} from './auth/auth_actions';
import {createFolder,getFolderList,getFolderDetail} from './dashboard/dashboard_actions';

export default function* rootSaga() {
  yield takeEvery(ACTION.ABOUT.GETABOUT, about);
  yield takeEvery(ACTION.SINGIN.SINGIN, signin);
  yield takeEvery(ACTION.DASHBOARD.CREATEFOLDER, createFolder);
  yield takeEvery(ACTION.DASHBOARD.FOLDERLIST, getFolderList);
  yield takeEvery(ACTION.DASHBOARD.FOLDERDETAIL, getFolderDetail);
  
}