import $ from 'jquery';
import cookie from './cookie';
import common from './common';
function getDataWithToken(url) {
  return new Promise((resolve, reject)=>{
    $.ajax({
      url: url,
      success: (data)=> {
        resolve(data);
      },
      headers: {       
         token:common.getSessionToken()
      },
      error: (error)=> {
        reject(error);
      }
    });
  });
}
function postDataWithToken(url, data) {
  return new Promise((resolve, reject)=>{
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: (data)=> {
        resolve(data);
      },
      headers: {
       token:common.getSessionToken()
      },
      error: (error)=> {
        reject(error);
      }
    });
  }) ;
}

function PostDataWithOutToken(url, data) {
  return new Promise((resolve, reject)=>{
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
      success: (data)=> {
        resolve(data);
      },
      headers: {       
      },
      error: (error)=> {
        reject(error);
      }
    });
  }); 
}
function PatchDataWithToken(url, data) {
  return new Promise((resolve, reject)=>{
    $.ajax({
      url: url,
      type: 'PATCH',
      data: data,
      success: (data)=> {
        resolve(data);
      },
      headers: {       
        token:common.getSessionToken()
     },
      error: (error)=> {
        reject(error);
      }
    });
  }); 
}
export {
  getDataWithToken,
  postDataWithToken,
  PostDataWithOutToken,
  PatchDataWithToken
};