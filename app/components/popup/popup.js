import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../../action_constants';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import Closebutton from  '../../../assets/images/group-15.svg';
import './popup.less';


class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showCreatefolderPopup:false,
        showgridicon:false,
        showUploadfilesPopup:false,
        showIndividual:true
     }
  }

  clearinput=(e)=>{
    this.setState({
      foldername:''
    })
  } 

  Upload_File=()=>{
      return(
          <div>
         <div className="upload-file"><div className="upload-file-button" onClick={this.showcontentpopup.bind(this,"individual")}><span>Individual</span></div><div onClick={this.showcontentpopup.bind(this,"group")} className="upload-file-button"><span>Group</span></div></div>
         <div className="form-folder">
          {this.state.showIndividual && this.individualcontents()}
          {!this.state.showIndividual && this.groupcontents()}
         </div> 
         </div>
      );
  }
 Create_Folder=()=>{
    return(
        <div>
          <div className="form-folder"><input type="text" value={this.state.foldername} onChange={this.onchangecomment} className="input-folder" placeholder="Foldername" ></input>
                <img onClick={this.clearinput.bind(this)} src={Closebutton} className="text-clear"/>
                <div className="create-folder-button"><span>Create Folder</span></div>
          </div>
       </div>
    );
}

  pullfiles=(fileInput)=>{
    var i=0;
    var fl=fileInput.target.files.length;
    let f2=[];
    while ( i < fl) {
      var file = fileInput.target.files[i];
      i++; 
      f2[i]=file;
      //upload in s3
      
    }
    this.setState({
      filecontent:f2
    })
}
  individualcontents=()=>{
    return(
     <div className="content-popup">
         <label className="fileContainergroup">
         Select Files 
         <input id="myfiles"  onChange={this.pullfiles.bind(this)} type="file"></input>
       </label>
       <div className="select-platform">Select Platform</div>
                 <div className="contain">
                     <label className="container">ios
                       <input type="checkbox"/>
                       <span className="checkmark"></span>
                     </label>
                     <label className="container">Andoird 
                       <input  type="checkbox"/>
                       <span className="checkmark"></span>
                     </label>
                     <label className="container">Web
                       <input type="checkbox"/>
                       <span className="checkmark"></span>
                     </label>
                 </div>
      </div>
    );
  }

  groupcontents=()=>{
    return(<div>
        {
            this.individualcontents()
        }
       <div>Add tags</div>
      </div>
    );
  }
  showcontentpopup=(tags)=>{
    if(tags=="individual"){
      this.setState({
        showIndividual:true
      });
    }
    else if(tags=="group"){
      this.setState({
        showIndividual:false
      });
    }
 }

  togglePopup(tags) {
    console.log(tags);
    if(tags=="Create Folder"){ 
   const{dispatch}=this.props;
   dispatch({type : ACTION.POPUP.CHANGEBOOL});
   }
 else if(tags=="Upload File"){
    const{dispatch}=this.props;
    dispatch({type : ACTION.POPUP.CHANGEBOOL});
 }
 }
  render() {
    const {typepopup} = this.props;
    const {showUploadfilesPopup} = this.props;
    console.log("type of popup",typepopup);
    return (
      <div>      
        <div className='popup'>
            <div className='popup_inner'>
                <div className="popup-header">
                    <span>{typepopup}</span>
                    <img onClick={this.togglePopup.bind(this,typepopup)}  src={Closebutton} className="Group-15"/>
                </div> 
                {typepopup=="Upload File" && this.Upload_File()} 
                {typepopup=="Create Folder" && this.Create_Folder()} 
            </div>
            </div>        
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    about: state.about
  };
};
export default connect(mapStateToProps)(Popup);
