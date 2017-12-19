const actions = {
    ABOUT: {
        'GETABOUT': 'GETABOUT',
        'LOADABOUT': 'LOADABOUT'
    },
    SINGIN: {
        'SINGIN': 'SINGIN'      
    },
    DASHBOARD: {
        'CREATEFOLDER':  'CREATEFOLDER'  ,
        'FOLDERLIST':    'FOLDERLIST',
        'FOLDERDETAIL':  'FOLDERDETAIL',
        'RENAME'   :'RENAME',
        'UPLOADIMAGE' : 'UPLOADIMAGE',
        'DELETEFOLDER':'DELETEFOLDER',
        'FILELENGTH':'FILELENGTH',
        'PROFILE':'PROFILE',
        'DELETEFILE':'DELETEFILE',
    },
    FILEUPLOAD:{
        'UPLOAD':'UPLOAD'
    },
    POPUP:{
       'CHANGEBOOL':'CHANGEBOOL',
       'LOADING':'LOADING',
       'CHANGEBOOL_LOADING':'CHANGEBOOL_LOADING'
    },
    SEARCH:{
        'SEARCH_TAGS':'SEARCH_TAGS',
        'SEARCH_PROJECTS':'SEARCH_PROJECTS',
        'FOLDERLIST':'FOLDERLIST',
        'COUNT':'COUNT',
        'FAVOURITE':'FAVOURITE',
        
    },
    SIDENAV:{
        'SEARCHFILTER':'SEARCHFILTER',
        'DELETEFAV':'DELETEFAV',
        'ADDFAV':'ADDFAV',
    },
    HEADER:{
        'PROFILEPOPUP':'PROFILEPOPUP'
    }

};
export default actions;