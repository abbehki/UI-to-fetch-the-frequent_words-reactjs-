import { takeEvery } from 'redux-saga/effects';
import ACTION from './action_constants';
import {about} from './about/about_saga';
import {signin} from './auth/auth_actions';
import {createFolder,getFolderList,getFolderDetail,changebool,deletefolder,renamefolder,search_tags,uploadImg,filelength} from './dashboard/dashboard_actions';
import {uploadfiles} from './multiplefile/multiplefile_action';
import {search_filter,search_project,getProjectList} from './components/side_nav_bar/side_nav_bar_action';



export default function* rootSaga() {
  yield takeEvery(ACTION.ABOUT.GETABOUT, about);
  yield takeEvery(ACTION.SINGIN.SINGIN, signin);
  yield takeEvery(ACTION.DASHBOARD.CREATEFOLDER, createFolder);
  yield takeEvery(ACTION.DASHBOARD.FOLDERLIST, getFolderList);
  yield takeEvery(ACTION.DASHBOARD.FOLDERDETAIL, getFolderDetail);
  yield takeEvery(ACTION.DASHBOARD.UPLOADIMAGE, uploadImg);
  yield takeEvery(ACTION.FILEUPLOAD.UPLOAD, uploadfiles);
  yield takeEvery(ACTION.POPUP.CHANGEBOOL, changebool);
  yield takeEvery(ACTION.DASHBOARD.DELETEFOLDER, deletefolder);
  yield takeEvery(ACTION.DASHBOARD.RENAME, renamefolder);
  yield takeEvery(ACTION.SEARCH.SEARCH_TAGS, search_tags);
  yield takeEvery(ACTION.DASHBOARD.FILELENGTH, filelength);
  yield takeEvery(ACTION.SIDENAV.SEARCHFILTER, search_filter);
  yield takeEvery(ACTION.SEARCH.SEARCH_PROJECTS, search_project);  
  yield takeEvery(ACTION.SEARCH.FOLDERLIST, getProjectList);
  
}