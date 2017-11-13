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
import ListView from '../../assets/images/list-deselected.svg';
import GridView from '../../assets/images/grid-deselected.svg';


class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.addFolder = this.addFolder.bind(this);  
    this.state = {
       folderArr :[],
       folderName:"",
       parentFolder:"",
       folderCreate:false,
       path:[]
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

  render() {
    return (
      <div>
      <Header></Header>
      <SideNavBar></SideNavBar>
      <div className="create-folder-btn" onClick={()=> this.showCreateFolder()}>Create Project</div>
        <div className="content-cont">
          <div className="container-boundary">
          <div className="top-div" >Asset Box
        <img src={GridView} className="Grid_deselected"/>
          <img src={ListView} className="list_deselected"/>
          </div>
          <div className="folder-path">
              {this.state.path.map((item,index) =>  {  
                    return(
                          <div className="path-cont" onClick={()=> this.folderPath(item,index)}>                        
                            <div className="path-name">{item.folderName} > </div>
                          </div>
                    )}
                  )}
            </div>
            <div className="side-nav-right"></div>
            <div className="folder-wrapper">
                {this.state.folderCreate  &&   
                        <div className="add-folder-cont">
                          <img src={FolderImage} className="folder-image"/>
                          <div className="folder-input"><input type="text" value={this.state.folderName} onChange={this.inputChange.bind(self, 'folderName')} onKeyPress={(event)=> {this.addFolder(event)}}/></div>
                        </div>  
                }
                  {this.state.folderArr.map((item,index) =>  {  
                    return(
                          <div className="folder-cont">
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