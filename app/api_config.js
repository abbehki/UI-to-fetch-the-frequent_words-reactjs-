const config = require('../config/config');
const baseUrl = config.baseUrl;

const API = {
  signIn : baseUrl + 'write/signIn',
  signUp : baseUrl + '/integration/signup',
  getRegisteredUsers : baseUrl + '/integration/getusers',
  subscribeFood : baseUrl + '/integration/subscribeFood',
  getFoodTakenUserList : baseUrl + '/integration/foodtakenusers'
};

module.exports = API;
