import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../action_constants';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import CONSTANT from '../common_constants';
import { GoogleLogin } from 'react-google-login-component';
import Header from '../components/header/header';
import PopUp from '../components/popup/popup';
import ErrorMsg from '../components/error_message/error_message';
import SideNavBar from '../components/side_nav_bar/side_nav_bar';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import './dashboard.less';
import FolderImage from '../../assets/images/group-17.png';
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
       showgridicon:false,
       foldername:'',
       showUploadfilesPopup:false,
       showIndividual:true,
       showsmallpopup:false,
       index:0,
       folderOnFocus:null,
       successMessage:false,
       totalCountOfFiles:0
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
  // countOfFiles(count){
  //   this.setState({totalCountOfFiles:count});
  // }    
 
  componentWillReceiveProps(newProps) {
     
      this.setState({folderArr:newProps.dashboard.folderArray.folderList});

      if(!newProps.dashboard.changebool_cancel || !newProps.dashboard.changestate_smallpopup){
        this.setState({
          showCreatefolderPopup:newProps.dashboard.changebool_cancel,
          showUploadfilesPopup:newProps.dashboard.changebool_cancel,
          showsmallpopup:newProps.dashboard.changestate_smallpopup,
        });
      }  
      if(newProps.dashboard.changestate_success){
        this.setState({
          successMessage:newProps.dashboard.changestate_success
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

     if(newProps.dashboard.fileUrl){
          let fileArray=[]
          fileArray.push(newProps.dashboard.fileUrl);           
          if(fileArray.length == this.state.totalCountOfFiles){
            console.log("all files are uplaoded");
          }
     }
      if(newProps.dashboard.folderDetail){
        this.setState({folderArr:newProps.dashboard.folderDetail.folderList});     
      }  
 
      if(newProps.dashboard.folderData){
        let folderArray =[];
        let eachFolderData =newProps.dashboard.folderData;
              this.state.folderArr.push(eachFolderData);            
              this.setState({folderCreate:false,folderName:""});      
              const{dispatch}=this.props;
              dispatch({type :'CLOSE_CREATEFOLDER'});
      }
                  
   }

   onClickmoremenu=(e,id)=>{
     console.log(id)
     this.setState({
      showsmallpopup: !this.state.showsmallpopup,
      index:e,
      folderOnFocus:id
    });
   }
   onClickshare=(e)=>{
    e.preventDefault();
    alert('share');
    e.stopPropagation(); 
   }

   onDelete=()=>{
     const{dispatch}=this.props;
     dispatch({type : ACTION.DASHBOARD.DELETEFOLDER, data :{directoryID :this.state.folderOnFocus} });
    }

   show_smallpopup=(index)=>{
     if(index==this.state.index){
      return(
        <div  id={index} className="smallpopup">
          <div className="smallpopup_inner">
          <div><img src={Rename} className="folder-image"/>Rename</div>
          <div><img src={Delete} onClick={this.onDelete} className="folder-image"/>Delete</div>
          {/* <div><div className="icon-group-8 folder-image"></div>Download</div> */}
          </div>
        </div>
       );
     }
   }

   listview=()=>{
    return(
        <div className="folder-wrapper">
          {this.state.folderArr.map((item,index) =>  {  
            return(
                  <div id={index} key={index}  className="folder-cont">
                   {this.state.showsmallpopup && 
                    this.show_smallpopup(index)
                    }
                    <img onClick={()=> this.folderDetail(item)} src={FolderImage} className="folder-image"/>
                    <div className="folder-name">{item.directoryName}</div>
                    <img src={MoreImage} onClick={this.onClickmoremenu.bind(this,index,item._id)} className="more"/>
                    <input type="button" onClick={this.onClickshare.bind(this)} className="Rectangle-share" value="Share"/>
                    <span className="project-size">123mb</span>
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
             <div key={index}  className="folder-cont-grid">
                {this.state.showsmallpopup && 
              this.show_smallpopup(index)
              }
              <img src={Foldergrid} className="folder-grid-image"/>
              <div className="folder-bottom">
                <div className="folder-name" >{item.directoryName}</div>                   
                <img src={MoreImage} className="folder-more" onClick={this.onClickmoremenu.bind(this,index,item._id)}/>
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
     if(tags=="create_folder")
   { this.setState({
      showCreatefolderPopup: !this.state.showCreatefolderPopup,
    });
  }
  else if(tags=="upload_file"){
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
      <Header></Header>
      <SideNavBar></SideNavBar>
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
               <PopUp title={"Success"} content={"Your file deleted Successfully."}/>                      
              : null
            }
        {/**
        * Button for input
        */}
      <div className="create-folder-btn" onClick={this.togglePopup.bind(this,"create_folder")}>Create Project</div>

       
        <div className="content-cont">
          <div className="container-boundary">
            <div className="top-div" >
            {/**
            * folderpath
            */}
              <div className="folder-path">
              {this.state.path.map((item,index) =>  {  
                    return(
                          <div className="path-cont" onClick={()=> this.folderPath(item,index)}>                        
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
             <div onClick={this.togglePopup.bind(this,"upload_file")}> <img src={UploadImage} className="Upload_file"/> <span className="Upload_File">Upload File</span></div>
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
    dashboard: state.dashboard
  };
};

export default connect(mapStateToProps)(DashBoard);