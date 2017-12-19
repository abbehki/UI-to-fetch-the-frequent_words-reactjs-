const config = require('../config/config');
const baseUrl = config.baseUrl;
const baseUrl2= config.baseUrl2;

const API = {
  profiledetail:"https://www.googleapis.com/oauth2/v1/userinfo?access_token=",
  //API 
  signIn : baseUrl2 + 'write/signIn',
  folderCreate : baseUrl2 + 'write/createDirectory',
  getfolderList : baseUrl2 + 'read/getDirectoryContent',/* ASter*/ 
  getfolderList2 : baseUrl2 + 'read/getDirectoryContent',  /*Shaziya*/
  deletefolders:baseUrl2+'write/archiveDirectory',
  delete_file:baseUrl2+'write/archiveFile',  
  renamefolder:baseUrl2+'write/updateDirectoryName',
  searching_tags:baseUrl2+'read/searchFiles',
  uploadImg : baseUrl2 + 'write/saveFile',
  searching_filter:baseUrl2+'read/fileSearchSortFilter',
  searching_project:baseUrl2+'read/searchProjectName?search=',
  getCountof:baseUrl2+'read/getCountOf',
  Favouriteof:baseUrl2+'write/UserFavourites',
};

module.exports = API;
