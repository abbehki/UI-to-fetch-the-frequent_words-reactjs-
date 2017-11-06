const config = require('../config/config');
const baseUrl = config.baseUrl;

const API = {
  signIn : baseUrl + 'write/signIn',
  folderCreate : baseUrl + 'write/createDirectory',
  getfolderList : baseUrl + 'read/getDirectoryContent',
  
};

module.exports = API;
