import $ from 'jquery';
function getDataWithToken(url) {
  return new Promise((resolve, reject)=>{
    $.ajax({
      url: url,
      success: (data)=> {
        resolve(data);
      },
      headers: {
        brandId: 2,
        token: cookie.get('token')
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
        brandId: 2
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
export {
  getDataWithToken,
  postDataWithToken,
  PostDataWithOutToken
};