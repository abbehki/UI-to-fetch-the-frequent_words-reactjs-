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
     const{getAllFile} =props;  
    this.state = {
        showCreatefolderPopup:false,
        showUploadfilesPopup:false,
        showIndividual:true,
        filelength:0,
        tagname:'',
        tags:[],
        foldername:'',
        parentFolder:'',
        platformArr :[{name:"IOS"},{name:"Android"},{name:"Web"}],
        selectedPlatform:[],
        filecontent:[],
        indexnumber:0,
        stoploop:true,
        active:'#32CD32',
        noactive:'',
        loading_value:0,
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
  selectPlatform(event){
    if(event.target.checked==true){
      this.state.selectedPlatform.push(event.target.value);                    
  }
    else{
      this.state.selectedPlatform.splice(this.state.selectedPlatform.indexOf(event.target.value),1);
  }
  }
  Share=()=>{
    alert("Share it here");
  }
  dateConversion=(date)=>{
    let objDate = new Date(date);
    return (objDate.toLocaleString("en-us", { month: "long" }))+"   "+objDate.getDate();
  }
  uploadFile(parentDirectoryId,event){
    const { dispatch } = this.props;  
    dispatch({type : ACTION.POPUP.LOADING});    
    var data =this.state;
    for(var i=1;i<this.state.filecontent.length;i++){
        let formData = new FormData();   
        formData.append("file", this.state.filecontent[i]);
        formData.append("width","45");
        formData.append("height","55");
        formData.append("platform",JSON.stringify(this.state.selectedPlatform));
        formData.append("parentDirectoryId",parentDirectoryId);
        formData.append("tags",JSON.stringify(this.state.tags));
        dispatch({type : ACTION.DASHBOARD.UPLOADIMAGE, data : {data:formData,totalfilelength:this.state.filelength} });
  }
}
  Upload_File=(parentId)=>{
      return(
      <div>
        <div className="upload-file"><div className="upload-file-button" style={{backgroundColor:this.state.active}} onClick={this.showcontentpopup.bind(this,"individual")}><span>Individual</span></div><div onClick={this.showcontentpopup.bind(this,"group")} style={{backgroundColor:this.state.noactive}} className="upload-file-button"><span>Group</span></div></div>
        <div className="form-folder">
        {!this.state.showIndividual && this.individualcontents("single")}
        {this.state.showIndividual && this.groupcontents()}
        <div className="upload-btn" onClick={this.uploadFile.bind(this,parentId)}>Upload</div>
        </div> 
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
  Loading=(e)=>{
    console.log("------>",this.state.loading_value);
    return(
        <div className="progress-bar-outer">
              <div className="progress-bar-content">Your File has been Uploading...<span>{Math.round(this.state.loading_value)}%</span></div>
              <span className="progress-bar">
                <span className="indicator" style={{width:this.state.loading_value+"%"}}>

                </span>
              </span>
          </div>
    );
  }
  Next=(index,length)=>{
    if(index>length){
      this.setState({
        indexnumber:0
      })
    }else{
      this.setState({
        indexnumber:index
      })
    }
  }
  Previous=(index,length)=>{
    if(index<0){
      this.setState({
        indexnumber:length
      })
    }else{
      this.setState({
        indexnumber:index
      })
    }
  }
  Detail_File=(fileArr)=>{
    return(
      <div className="filedetail">
        <div className="fileImage">     
          <div className="icon-side_arrow_left arrow" onClick={()=>this.Previous(--this.state.indexnumber,fileArr.length-1)}></div> 
          <img className="fileImage-popup" src={fileArr[this.state.indexnumber].fileUrl} alt="[IMAGE]"/>
          <div className="icon-Side_arrow_right arrow" onClick={()=>this.Next(++this.state.indexnumber,fileArr.length-1)}></div>
        </div>
        <div className="filesinfo">
          <div className="filename" >{fileArr[this.state.indexnumber].fileName}</div>
          <div className="file-info"><span>File Type:</span><span>{fileArr[this.state.indexnumber].fileFormat}</span></div>
          <div className="file-info"><span>File Size :</span><span>{Math.round((fileArr[this.state.indexnumber].fileSize/(1024*1024))* 100)/100 }MB</span></div>
          <div className="file-info"><span>Created on:</span><span>{this.dateConversion(fileArr[this.state.indexnumber].createdAt)}</span></div>
          <div className="file-info"><span>Modified date :</span><span>{this.dateConversion(fileArr[this.state.indexnumber].modifiedAt)}</span></div>
          <a href={fileArr[this.state.indexnumber].fileUrl}> <button className="file-dowload-button">Download</button></a>
        </div>
      </div>
    );
  }
  pullfiles=(fileInput)=>{
    var i=0;
    const{dispatch}=this.props;    
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
    });
    dispatch({type:ACTION.DASHBOARD.FILELENGTH,data:fl})
  }
 

  individualcontents=(tags)=>{
    return(
     <div className="content-popup">

         <label className="fileContainergroup">
        <span>Select Files </span>

            {         
              tags=="multiple" && <input id="myfiles"  onChange={this.pullfiles.bind(this)} type="file"></input>
            }
            {
              tags=="single" && <div> <div className="filelength">{this.state.filelength} files are selected</div> <input id="myfiles" multiple  onChange={this.pullfiles.bind(this)} type="file"></input></div>
            }
         </label>
       <div className="select-platform">Select Platform</div>          
            <div className="contain">
              {this.state.platformArr.map((item,index) =>  {                                    
                    return(
                        <div className="">
                          <label className="container"><span>{item.name}</span>
                              <input type="checkbox" value={item.name.toUpperCase()}  onClick={this.selectPlatform.bind(this)}/>  
                            <span className="checkmark"></span>
                          </label>
                        </div> 
                      )                   
                })
                }
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
        showIndividual:true,
        active:'#32CD32',
        noactive:''
      });
    }
    else if(tags=="group"){
      this.setState({
        showIndividual:false,
        noactive:'#32CD32',
        active:''
      });
    }
  }

  togglePopup(tags) {
      if(tags=="Create Folder"){ 
    const{dispatch}=this.props;
    dispatch({type : ACTION.POPUP.CHANGEBOOL});
    }
      else if(tags=="Upload File"){
        const{dispatch}=this.props;
        dispatch({type : ACTION.POPUP.CHANGEBOOL});
    }
    else if(tags=="Filedetail"){
      const{dispatch}=this.props;
      dispatch({type : ACTION.POPUP.CHANGEBOOL});
    }
    else if(tags=="Loading"){
      const{dispatch}=this.props;
      dispatch({type : ACTION.POPUP.CHANGEBOOL_LOADING});
    }
  }

  render() {
    const {title} = this.props;
    const{width_resize}=this.props;
    const{height_resize}=this.props;
    const{content}=this.props;
    if(content && content.index_number && this.state.stoploop){
      let newState=Object.assign({},this.state);
      newState.indexnumber=content.index_number;
      newState.stoploop=false;
      this.setState(newState);
    }
    return (
      <div>  
        { title!="Success" &&
           <div className='popup'>

           <div className='popup_inner' style={{width:width_resize,height:height_resize}}>
               <div className="popup-header">
                  <span>{title}</span>
                  <div onClick={this.togglePopup.bind(this,title)}  className="icon-icn_close_popup Group-15"></div>
                  {title=="Filedetail" &&
                   <div onClick={this.Share.bind(this,title)}  className="icon-Share2 Group-15"></div>
                  } 
               </div> 
               {title=="Upload File" && this.Upload_File(content)} 
               {title=="Create Folder" && this.Create_Folder(content)} 
               {title=="Filedetail" && this.Detail_File(content.data)} 
               {title=="Loading" && this.Loading(content)} 
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
  componentWillReceiveProps(newProps){
    if(newProps.dashboard.countoffile){
      this.setState({
        loading_value:(newProps.dashboard.countoffile/newProps.dashboard.file_length)*100
      })
    }
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
