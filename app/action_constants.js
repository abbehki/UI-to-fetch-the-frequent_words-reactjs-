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
        'FILELENGTH':'FILELENGTH'
    },
    FILEUPLOAD:{
        'UPLOAD':'UPLOAD'
    },
    POPUP:{
       'CHANGEBOOL':'CHANGEBOOL'
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
    }

};
export default actions;