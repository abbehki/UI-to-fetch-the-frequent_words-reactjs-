import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../action_constants';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import CONSTANT from '../common_constants';
import { GoogleLogin } from 'react-google-login-component';
import Header from '../components/header/header';
import ErrorMsg from '../components/error_message/error_message';
import SideNavBar from '../components/side_nav_bar/side_nav_bar';
import './dashboard.less';
import FolderImage from '../../assets/images/group-17.png';
import MoreImage from '../../assets/images/more.png';
import Selected_ListView from '../../assets/images/list-selected.svg';
import Deselected_GridView from '../../assets/images/grid-deselected.svg';
import Deselected_ListView from '../../assets/images/list-deselected.svg';
import Selected_GridView from '../../assets/images/grid-selected.svg';
import Foldergrid from  '../../assets/images/folder-grid.svg';
import Closebutton from  '../../assets/images/group-15.svg';



class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.addFolder = this.addFolder.bind(this);  
    this.state = {
       folderArr :[],
       folderName:"",
       parentFolder:"",
       folderCreate:false,
       path:[],
       showPopup:false,
       showgridicon:false,
       foldername:''
    }
  }
 inputChange = (name, event)=>{
        this.setState({
            [name]:event.target.value
        })
    }
  showCreateFolder(){
    this.setState({folderCreate:true}); 
  }

  onchangecomment=(event)=>{
    this.setState({
      foldername:event.target.value
    })
  }
 
  addFolder(event){
    console.log(event.keyCode);
    if(event.which === 13){
      let paramObj = {
          directoryName:this.state.folderName,
          parentDirectoryId:this.state.parentFolder || ""
      }

      const { dispatch } = this.props;
    dispatch({type : ACTION.DASHBOARD.CREATEFOLDER , data : {paramObj}}); 
    }  
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

  componentWillReceiveProps(newProps) {

      this.setState({folderArr:newProps.dashboard.folderArray.folderList});

      if(newProps.dashboard.folderDetail){
        this.setState({folderArr:newProps.dashboard.folderDetail.folderList,});
      }  

      if(newProps.dashboard.folderData){ 
        let folderArray =[]; 
        let eachFolderData =newProps.dashboard.folderData;
              this.state.folderArr.push(eachFolderData);
              this.state.path.push({folderName:eachFolderData.directoryName,_id:eachFolderData._id})
              this.setState({folderCreate:false,folderName:""});            
      }
                  
   }

   onClickmoremenu=(e)=>{
     e.preventDefault();
     //write something here
     alert('menu');
     e.stopPropagation();
     
   }
   onClickshare=(e)=>{
    e.preventDefault();
    //write something here
    alert('share');
    e.stopPropagation(); 
   }

   listview=()=>{
    return(
        <div className="folder-wrapper">
        {this.state.folderCreate  &&   
                <div className="add-folder-cont">
                  <img src={FolderImage} className="folder-image"/>
                  <div className="folder-input"><input type="text" value={this.state.folderName} onChange={this.inputChange.bind(self, 'folderName')} onKeyPress={(event)=> {this.addFolder(event)}}/></div>
                </div>  
        }
          {this.state.folderArr.map((item,index) =>  {  
            return(
                  <div key={index}  className="folder-cont">
                    <img onClick={()=> this.folderDetail(item)} src={FolderImage} className="folder-image"/>
                    <div className="folder-name">{item.directoryName}</div>
                    <img src={MoreImage} onClick={this.onClickmoremenu.bind(this)} className="more"/>
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
                    <img src={Foldergrid} className="folder-grid-image"/>
                    <div className="folder-bottom">
                      <div className="folder-name">{item.directoryName}</div>                   
                      <img src={MoreImage} className="folder-more"/>
                    </div>
                  </div>
            )}
          )                
          }
    </div>
     );
   }

   clearinput=(e)=>{
        this.setState({
          foldername:''
        })
   }

   togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
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
      { this.state.showPopup ? 
            <div className='popup'>
              <div className='popup_inner'>
                  <div className="popup-header">
                      <span>Create Folder</span>
                      <img onClick={this.togglePopup.bind(this)}  src={Closebutton} className="Group-15"/>
                  </div>  
                  <div className="form-folder"><input type="text" value={this.state.foldername} onChange={this.onchangecomment} className="input-folder" placeholder="Foldername" ></input>
                  <img onClick={this.clearinput.bind(this)} src={Closebutton} className="text-clear"/>
                  <div className="select-platform">Select Platform</div>
                  <div class="contain">
                      <label class="container">ios
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                      <label class="container">Andoird 
                        <input  type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                      <label class="container">Web
                        <input type="checkbox"/>
                        <span class="checkmark"></span>
                      </label>
                  </div>
                  </div>
                  <button className="upload-button">Upload</button>
              </div>
            </div>
              : null
            }
      <div className="create-folder-btn" onClick={this.togglePopup.bind(this)}>Create Project</div>
        <div className="content-cont">
          <div className="container-boundary">
          <div className="top-div" >
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
         
            <div className="side-nav-right"></div>
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