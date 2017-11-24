import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../../action_constants';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import Closebutton from  '../../../assets/images/group-15.svg';
import Confirm from  '../../../assets/images/confirmation.svg';
import './popup.less';


class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showCreatefolderPopup:false,
        showUploadfilesPopup:false,
        showIndividual:true,
        filelength:0,
        tagname:'',
        tags:[],
        foldername:'',
        parentFolder:''
     }
  }

  addFolder=(parentId,event)=>{
      if(this.state.foldername!="" || event.key=="Enter"){
        let paramObj = {
          directoryName:this.state.foldername,
          parentDirectoryId:parentId|| ""
        }
        const { dispatch } = this.props;
        dispatch({type : ACTION.DASHBOARD.CREATEFOLDER , data : {paramObj}}); 
      }   else{
        alert("No empty !");
      }  
  }

  onChangekey=(e,name)=>{
      if(e=="foldername"){
        this.setState({
          foldername:name.target.value
        })
      }
      else if(e=="tagname"){
              this.setState({
            tagname:name.target.value
            })
        }
    }

  _handlekeypress=(event)=>{
      if(event.key=="Enter"){
        console.log(event.target.value);
        this.state.tags.push(event.target.value);
        this.setState({
          tagname:''
        })
      }          
  }

  clearinput=(e)=>{
    this.setState({
      foldername:'',
      tags:'',
    })
  } 

  Upload_File=()=>{
      return(
          <div>
         <div className="upload-file"><div className="upload-file-button" onClick={this.showcontentpopup.bind(this,"individual")}><span>Individual</span></div><div onClick={this.showcontentpopup.bind(this,"group")} className="upload-file-button"><span>Group</span></div></div>
         <div className="form-folder">
          {this.state.showIndividual && this.individualcontents("single")}
          {!this.state.showIndividual && this.groupcontents()}
         </div> 
         <div className="Uploadfiles"><span>Upload</span></div>
         </div>
      );
  }
  Create_Folder=(parentId)=>{
    return(
        <div>
          <div className="form-folder"><input type="text" value={this.state.foldername} onChange={this.onChangekey.bind(this,"foldername")} className="input-folder" placeholder="Foldername" ></input>
                <img onClick={this.clearinput.bind(this)} src={Closebutton} className="text-clear"/>
                <div className="create-folder-button" onKeyPress={this._handlekeypress} onClick={this.addFolder.bind(this,parentId)}><span>Create Folder</span></div>
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
      filecontent:f2,
      filelength:fl
    })
  }
  onClickuploadfile=(tags)=>{
      if(tags=="single"){
          console.log(tags);
      }else{
        console.log(tags);        
      }
  }

  individualcontents=(tags)=>{
    return(
     <div className="content-popup">
        <label className="fileContainergroup">
          <span>Select Files </span>

              {         
                tags=="single" && <input id="myfiles"  onChange={this.pullfiles.bind(this)} type="file"></input>
              }
              {
                tags=="multiple" && <div> <div className="filelength">{this.state.filelength} files are selected</div> <input id="myfiles" multiple  onChange={this.pullfiles.bind(this)} type="file"></input></div>
              }
        </label>
        <div className="select-platform">Select Platform</div>
        <div className="contain">
            <label className="container"><span>iOS</span>
              <input type="checkbox"/>
              <span className="checkmark"></span>
            </label>
            <label className="container"><span>Andoird </span>
              <input  type="checkbox"/>
              <span className="checkmark"></span>
            </label>
            <label className="container"><span>Web</span>
              <input type="checkbox"/>
              <span className="checkmark"></span>
            </label>
        </div>        
      </div>
    );
  }
  groupcontents=()=>{
    return(
    <div>
      {
        this.individualcontents("multiple")
      }
      <div className="select-platform" style={{marginBottom:'0px'}}>Add Tags<span>(Minimum 3 Tags)</span></div>
      <input type="text" value={this.state.tagname}  onChange={this.onChangekey.bind(this,"tagname")} onKeyUp={this._handlekeypress.bind(this)} className="input-tags" placeholder="Type and Enter to Commit Tag" ></input>
      <div className="tags">
            { 
                this.state.tags.map((tag,index)=>(
                  <div key={index} className="tags-names">
                    <span>{tag}</span>  
                  </div>
          ))}
      </div>
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
    const {title} = this.props;
    const{width_resize}=this.props;
    const{height_resize}=this.props;
    const{content}=this.props;
    console.log("type of popup",title+"--->"+content);
    return (
      
      <div>  
        { title!="Success" &&
           <div className='popup'>
            <div className='popup_inner' style={{width:width_resize,height:height_resize}}>
                <div className="popup-header">
                    <span>{title}</span>
                    <img onClick={this.togglePopup.bind(this,title)}  src={Closebutton} className="Group-15"/>
                </div> 
                {title=="Upload File" && this.Upload_File()} 
                {title=="Create Folder" && this.Create_Folder(content)} 
            </div>
           </div>
        }   
        {
          title=="Success" &&
          <div className="successmessage">
             <img src={Confirm} className="successimage"/>
             <div className="Message-success">{content}</div>
          </div>
        }        
      </div>
    );
  }
  componentDidMount(){
   
  }
}


const mapStateToProps = (state) => {
  return {
    about: state.about,
    dashboard: state.dashboard
    
  };
};
export default connect(mapStateToProps)(Popup);
