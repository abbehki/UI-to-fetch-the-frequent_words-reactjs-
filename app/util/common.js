import cookie from './cookie';

const storeSessionOnCookie = (data)=>{
    cookie.set('_sd',JSON.stringify(data),60*24*60*60); // store token for 60 days
    cookie.set('token',data.token);
};

const getSessionData = ()=> {
    let sessionData;
    try {
        sessionData = {
            userData: JSON.parse(cookie.get('_sd'))
        };
    } catch (e) {
        sessionData = {
            lang : "en"
        };
        storeSessionOnCookie(sessionData);
    }
    return sessionData;
};
const deleteSessionData = ()=> {
    cookie.delete('_sd');
};
const join = (ary,joinDelmiter)=> {
    if(typeof joinDelmiter == "string") return ary.join(joinDelmiter);
    else if(typeof joinDelmiter == "function"){
      let str = "";
      ary.forEach((item, idx) => {
        str += joinDelmiter(item,idx)+item;
      });
      return str;
    }
};
const getUserLanguage = ()=> {
    let language='ar';
    try {
        language = JSON.parse(cookie.get('_sd')).lang;
    } catch(e) {
        language = 'ar';
    }
    return language;
};
const getSessionToken = ()=> {
  let sessionData;
  try{
    sessionData = cookie.get('token');
  }
  catch(e){
    sessionData = {sessionToken : null};
  }
  return sessionData;
};
const numberWithCommas = (x)=> {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

module.exports = {
    storeSessionOnCookie,
    getSessionData ,
    join,
    deleteSessionData,
    getUserLanguage,
    getSessionToken,
    numberWithCommas
};
