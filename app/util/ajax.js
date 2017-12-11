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
function deleteDataWithToken(url,data) {
  alert("deletetetete")
  return new Promise((resolve, reject)=>{
    $.ajax({
      url: url,
      type:'DELETE',
      data:data,
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

function postMulitipartDataWithToken(url, data) {
  return new Promise((resolve, reject)=>{
    $.ajax({
      url: url,
      type: 'POST',
      enctype: "multipart/form-data",
      contentType: false,
      data: data,
      processData: false,
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
      data: JSON.stringify(data),
      contentType: 'application/json',
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
  postMulitipartDataWithToken,
  PatchDataWithToken,
  deleteDataWithToken
};