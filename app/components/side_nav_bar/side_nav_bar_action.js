import { delay } from 'redux-saga';
import { call,put, takeEvery,select} from 'redux-saga/effects';
import {PostDataWithOutToken,postDataWithToken,getDataWithToken,postMulitipartDataWithToken,PatchDataWithToken,deleteDataWithToken} from '../../util/ajax';
import API from '../../api_config';
import { browserHistory } from 'react-router';
import ACTION from '../../action_constants';
import CONSTANTS from '../../common_constants';
import {storeSessionOnCookie, getSessionData} from '../../util/common';
import cookie from '../../util/cookie';
import history from '../../history';



function* search_filter(action) {
  try {   
     const filterdetail = yield call(getDataWithToken, API.searching_filter +"?fileFormat="+action.data.fileFormat+'&directoryId='+action.data.Id+'&platform='+action.data.Platform+'&height='+action.data.height+'&width='+action.data.width+'&search='+action.data.search+'&sort='+action.data.Date);
     yield put({type : "FILTERDETAIL", data : filterdetail });     
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
function* getCount(action) {
  try { 
    const counts = yield call(getDataWithToken, API.getCountof);
    yield put({type : "COUNTS_FILTER", data : {platform:counts.data.platforms,fileformats:counts.data.fileFormats} });   
  } catch (e) {
    yield put({type : "ERROR", error : e.error});
  }
}  
function* getFavorite(action) {
  try { 
    const Favorite = yield call(getDataWithToken, API.Favouriteof);
    yield put({type : "GETFAVOURITE", data :Favorite });   
  } catch (e) {
    yield put({type : "ERROR", error : e.error});
  }
}  
 
function* addfavourite(action) {
  try { 
    console.log(action.data);
    const addFavorite = yield call(postDataWithToken, API.Favouriteof,action.data);
   // yield put({type : "ADDFAVOURITE", data : addFavorite });   
   console.log(addFavorite)
  } catch (e) {
    yield put({type : "ERROR", error : e.error.message});
  }
} 

function* deletefavourite(action) {
  try { 
    console.log(action.data);
    const deleteFavorite = yield call(deleteDataWithToken, API.Favouriteof,action.data);
    //yield put({type : "GETFAVOURITE", data :deleteFavorite }); API
  } catch (e) {
    alert(e)
    yield put({type : "ERROR", error : e.error});
  }
} 
export {
    search_filter,
    search_project,
    getProjectList,
    getCount,
    getFavorite,
    deletefavourite,
    addfavourite,
    
};

