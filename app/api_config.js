const config = require('../config/config');
const baseUrl = config.baseUrl;
const baseUrl2=config.baseUrl2;

const API = {
  signIn : baseUrl + 'write/signIn',
  folderCreate : baseUrl + 'write/createDirectory',
  getfolderList : baseUrl2 + 'read/getDirectoryContent',
  getfolderList2 : baseUrl + 'read/getDirectoryContent',  
  deletefolders:baseUrl2+'write/archiveDirectory'
};

module.exports = API;
