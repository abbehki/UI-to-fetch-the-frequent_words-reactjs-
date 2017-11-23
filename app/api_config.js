const config = require('../config/config');
const baseUrl = config.baseUrl;
const baseUrl2=config.baseUrl2;

const API = {
  signIn : baseUrl2 + 'write/signIn',
  folderCreate : baseUrl2 + 'write/createDirectory',
  getfolderList : baseUrl2 + 'read/getDirectoryContent',/* ASter*/ 
  getfolderList2 : baseUrl2 + 'read/getDirectoryContent',  /*Shaziya*/
  deletefolders:baseUrl2+'write/archiveDirectory',
  renamefolder:baseUrl2+'write/updateDirectoryName',
  searching_tags:baseUrl2+'read/searchFiles',
};

module.exports = API;
