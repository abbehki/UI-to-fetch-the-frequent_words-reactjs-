import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../action_constants';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import CONSTANT from '../common_constants';
import { GoogleLogin } from 'react-google-login-component';
import PopUp from '../components/popup/popup';
import ErrorMsg from '../components/error_message/error_message';
import MenuBar from '../components/menu_bar/menu_bar';
import SideNavBar from '../components/side_nav_bar/side_nav_bar';
import './dashboard.less';
import FolderImage from '../../assets/images/group-17.png';
import FileImage from '../../assets/images/group-2-file.svg';
import MoreImage from '../../assets/images/more.png';
import Selected_ListView from '../../assets/images/list-selected.svg';
import Deselected_GridView from '../../assets/images/grid-deselected.svg';
import Deselected_ListView from '../../assets/images/list-deselected.svg';
import Selected_GridView from '../../assets/images/grid-selected.svg';
import Foldergrid from  '../../assets/images/folder-grid.svg';
import Closebutton from  '../../assets/images/group-15.svg';
import UploadImage from  '../../assets/images/upload-file.svg';
import Rename from  '../../assets/images/group-2.svg';
import Delete from  '../../assets/images/group-7.svg';
import Download from '../../assets/images/group-8.svg';
import '../common.less'


class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       folderArr :[],
       folderName:"",
       parentFolder:"",
       folderCreate:false,
       path:[{folderName:"Dashboard",_id:""}],
       showCreatefolderPopup:false,
       showgridicon:true,
       foldername:'',
       showUploadfilesPopup:false,
       showIndividual:true,
       showsmallpopup:false,
       index:0,
       folderOnFocus:null,
       successMessage:false,
       hidetext:"hide",
       showtext:"folder-name",
       renameproject:'',
       filesArr:[],
       totalCountOfFiles:0,
       fileArray:[]
    }
  }
  showCreateFolder(){
      this.setState({folderCreate:true}); 
  }

  onchangecomment=(event)=>{
      this.setState({
        foldername:event.target.value
      })
  }
 
  folderDetail(folderObj){
      this.state.path.push({folderName:folderObj.directoryName,_id:folderObj._id});  
      this.setState({parentFolder:folderObj._id}); 
      const { dispatch } = this.props;
      dispatch({type : ACTION.DASHBOARD.FOLDERDETAIL, data : folderObj._id });
  }

  fileDetail(fileObj){
      alert("popup where file detail shows");
  }

  folderPath(pathObj,index){
    if(index <this.state.path.length){
      let pathArray = [];
      for(var i=0;i<= index;i++){
          pathArray.push(this.state.path[i]);
      }
      this.setState({path:pathArray});
    }else{
      this.state.path.push({folderName:pathObj.directoryName,_id:pathObj._id});
    }
      const { dispatch } = this.props;
      dispatch({type : ACTION.DASHBOARD.FOLDERDETAIL, data : pathObj._id });
  }

  componentDidMount() {
      let params ={};       
      const { dispatch } = this.props;  
      dispatch({type : ACTION.DASHBOARD.FOLDERLIST, data : params });
  } 
   
 
  componentWillReceiveProps(newProps) {
      if(newProps.dashboard.folderArray){
        this.setState({folderArr:newProps.dashboard.folderArray.folderList});
      }
      if(newProps.dashboard.folderDetail){
        this.setState({filesArr:newProps.dashboard.folderDetail.filesList});   
        this.setState({folderArr:newProps.dashboard.folderDetail.folderList});         
      }
       if(!newProps.dashboard.changebool_cancel || !newProps.dashboard.changestate_smallpopup){
        this.setState({
          showCreatefolderPopup:newProps.dashboard.changebool_cancel,
          showUploadfilesPopup:newProps.dashboard.changebool_cancel,
          showsmallpopup:newProps.dashboard.changestate_smallpopup,
        });
      } 
       if(newProps.dashboard.changestate_success){
        this.setState({
          successMessage:newProps.dashboard.changestate_success,
          showsmallpopup:!newProps.dashboard.changestate_success
        })
        let self = this;
        setTimeout(function(){
          self.setState({
            successMessage:!newProps.dashboard.changestate_success
          })
        },3000);
        const{dispatch}=this.props;
        dispatch({type :'DELETE_NOSHOW'});
      }
       if(newProps.dashboard.folderDetail){
        this.setState({folderArr:newProps.dashboard.folderDetail.folderList});    
   }  

   if(newProps.dashboard.fileUrl){
    this.state.fileArray.push(newProps.dashboard.fileUrl); 
    console.log(newProps.dashboard.fileUrl)  
    // if(this.state.fileArray.length == newProps.dashboard.file_length){
    //   const { dispatch } = this.props;
    //   dispatch({type : ACTION.DASHBOARD.FOLDERDETAIL, data : newProps.dashboard.fileUrl.parentDirectoryId});
    // }
}
       if(newProps.dashboard.folderData){
        let folderArray =[];
        let eachFolderData =newProps.dashboard.folderData;
              this.state.folderArr.push(eachFolderData);            
              this.setState({folderCreate:false,folderName:""});      
              const{dispatch}=this.props;
              dispatch({type :'CLOSE_CREATEFOLDER'});       
            }

      if(newProps.dashboard.search_flag){
        const{dispatch}=this.props;        
        this.setState({filesArr:newProps.dashboard.search_content,
              folderArr:[],
            path:[{folderName:"Dashboard",_id:""}]});    
            dispatch({type :'CLOSE_CREATEFILES'});          
      }   


   }

  onClickshare=(e)=>{
        e.preventDefault();
        alert('share');
        e.stopPropagation(); 
   }

  onDelete=(_id,_parentDirectoryId)=>{
        const{dispatch}=this.props;
        dispatch({type : ACTION.DASHBOARD.DELETEFOLDER, data :{data:{directoryID :_id},parentDirectoryId:_parentDirectoryId} });
    }

  togglepopup=(index, e)=>{
        if(e){e.stopPropagation()}
          const newState = Object.assign(this.state);
          newState.folderArr.forEach((item, folderIndex)=> {
            item.showPopup = false;
            item.editable  = false;
            if(index === folderIndex) {
              item.editable = true;
            }
          });
          this.setState(newState);
    }
  onenter=(id,index_value,e)=>{
        if(e.key=="Enter"){ 
          const{dispatch}=this.props;
          dispatch({type :ACTION.DASHBOARD.RENAME, data : {newDirectoryName:e.target.value,directoryID:id} });  
          const newState = Object.assign(this.state);
          newState.folderArr.forEach((item, folderIndex)=> {
            item.showPopup = false;
            item.editable  = false;
            if(index_value === folderIndex) {
              item.directoryName=e.target.value;
            }
          });
          this.setState(newState); 
        }
  }
  showActionPopup = (index)=> {
     const newState = Object.assign(this.state);
     newState.showsmallpopup=!this.state.showsmallpopup;
     newState.folderArr.forEach((item, folderIndex)=> {
       item.showPopup = false;
       if(index === folderIndex) {
         item.showPopup = true;   
       }
     });
     this.setState(newState);
   }
  onDownload=(index)=>{
     alert("download api");
  }
   listview=()=>{
    return(
        <div className="folder-wrapper">
          {this.state.folderArr.map((item,index) =>  {
            return(
              <div key={index}  className="folder-cont">
                <img onClick={()=> this.folderDetail(item)} src={FolderImage} className="folder-image"/>
                {!item.editable && <div className={this.state.showtext}>{item.directoryName}</div>}
                {item.editable && <input defaultValue={item.directoryName} onKeyUp={this.onenter.bind(this,item._id,index)}  type="text" /> }
                <div className="icon-icn_more more" onClick={this.showActionPopup.bind(this, index)}>
                {/* <img className="more" src={MoreImage} onClick={this.showActionPopup.bind(this, index)}/>  */}
                {this.state.showsmallpopup && item.showPopup && 
                <div  id={index} className="smallpopup">
                  <div className="smallpopup_inner">
                    <div><img src={Rename} onClick={this.togglepopup.bind(this,index)} className="folder-image"/>Rename</div>
                    <div><img src={Delete} onClick={this.onDelete.bind(this,item._id,item.parentDirectoryId)} className="folder-image"/>Delete</div>
                  </div>
                </div>
                }
                </div>
                <input type="button" onClick={this.onClickshare.bind(this)} className="Rectangle-share" value="Share"/>
              </div>
            )}
          )                
          }
          {this.state.filesArr.map((item,index) =>{
              return(
                <div>
                  <div key={index}  className="folder-cont">
                    <img onClick={()=> this.fileDetail(item)} src={FileImage} className="folder-image"/>
                    <div className={this.state.showtext}>{item.fileName}</div>
                    <div className="icon-icn_download2 more" onClick={this.onDownload.bind(this, index)}>
                    </div>
                    <input type="button" onClick={this.onClickshare.bind(this)} className="Rectangle-share" value="Share"/>
                    <span className="project-size">{Math.round((item.fileSize/(1024*1024))* 100)/100 }mb</span>
                  </div>
                </div>
            )}
          )                
          }
        </div>
    );
   }
  gridview=()=>{
    return (
      <div className="folder-wrapper-grid">
        {this.state.folderArr.map((item,index) =>  {  
          return(             
            <div id={index} key={index}  className="folder-cont-grid">
            <img onClick={()=> this.folderDetail(item)} src={Foldergrid} className="folder-grid-image"/>
            <div className="folder-bottom">
             {!item.editable && <div className={this.state.showtext}>{item.directoryName}</div>}
             {item.editable && <input className="input-grid" defaultValue={item.directoryName} onKeyUp={this.onenter.bind(this,item._id,index)}  type="text" /> }           
             <div className="icon-icn_more folder-more" onClick={this.showActionPopup.bind(this,index)}>
             {this.state.showsmallpopup && item.showPopup && 
             <div  id={index} className="smallpopup">
              <div className="smallpopup_inner">
                <div><img src={Rename} onClick={this.togglepopup.bind(this,index)} className="folder-image"/>Rename</div>
                <div><img src={Delete} onClick={this.onDelete.bind(this,item._id,item.parentDirectoryId)} className="folder-image"/>Delete</div>
              </div>
             </div>
                }
              </div>
          </div>
        </div>
            )}
          )                
          }
          {this.state.filesArr.map((item,index) =>  {  
          return(             
          <div id={index} key={index}  className="file-cont-grid">
            <div className="icon-Share file-share" onClick={this.onClickshare.bind(this)}></div>
            <div className="file-outer-image" ><img onClick={()=> this.fileDetail(item)} src={item.fileUrl} className="file-grid-image" /></div>
            <div className="file-bottom">
              <div className="file-name">{item.fileName}</div>
              <div className="icon-icn_download2 file-more" onClick={this.onDownload.bind(this,index)}></div>
            </div>
        </div>
            )}
          )                
          }
    </div>
     );
   }

  togglePopup(tags) {
     console.log(tags);
     if(tags=="create_folder"){
      this.setState({
      showCreatefolderPopup: !this.state.showCreatefolderPopup,
     });
    }else if(tags=="upload_file"){
    this.setState({
      showUploadfilesPopup: !this.state.showUploadfilesPopup,
    });
   }
  }
  showgridview=()=>{
     this.setState({
       showgridicon:true
     })
   }
  showlistview=()=>{
     this.setState({
      showgridicon:false
    })
   }

  render() {
    return (
      <div>
      <MenuBar/>
       {/**
        * Popups
        */}
           { this.state.showCreatefolderPopup ? 
              <PopUp title={"Create Folder"} content={this.state.parentFolder} width_resize={'567px'} height_resize={'200px'}/>                                                   
              : null
            }
            { this.state.showUploadfilesPopup ? 
               <PopUp title={"Upload File"} content={this.state.parentFolder}/>                      
              : null
            }
             { this.state.successMessage ? 
               <PopUp title={"Success"} content={this.props.dashboard.response}/>                      
              : null
            }
        {/**
        * Button for input
        */}
      <div className="create-folder-btn" onClick={this.togglePopup.bind(this,"create_folder")}>Create Folder</div>   
        <div className="content-cont">
          <div className="container-boundary">
            <div className="top-div" >
            {/**
            * folderpath
            */}
              <div className="folder-path">
                {this.state.path.map((item,index) =>  {  
                      return(
                            <div key={index} className="path-cont" onClick={()=> this.folderPath(item,index)}>                        
                              <div className="path-name">{item.folderName} > </div>
                            </div>
                      )}
                    )}
              </div>
              {this.state.showgridicon && <span><img onClick={this.showgridview.bind()} src={Selected_GridView} className="Grid_deselected"/> 
              <img onClick={this.showlistview.bind()} src={Deselected_ListView} className="list_deselected"/></span>}
              {!this.state.showgridicon && <span><img onClick={this.showgridview.bind()} src={Deselected_GridView} className="Grid_deselected"/> 
              <img onClick={this.showlistview.bind()} src={Selected_ListView} className="list_deselected"/></span>}
              </div>
              {/**
              * Left navigation bar
              */}
              <div className="side-nav-right">
                {this.state.path.length>1 &&
                <div onClick={this.togglePopup.bind(this,"upload_file")}> <img src={UploadImage} className="Upload_file"/> <span className="Upload_File">Upload File</span></div>              
                }
              </div>
              {/**
              * LIST OT GRID VIEW
              */}
              {!this.state.showgridicon && this.listview()}
              {this.state.showgridicon && this.gridview()}
          </div>

        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
dashboard:state.dashboard
  };
};

export default connect(mapStateToProps)(DashBoard);