import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../action_constants';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import CONSTANT from '../common_constants';
import './upload.less';



class Fileupload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myfiles:'myfiles',
      filecontent:[],
    }
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
  

  componentDidMount() {
        
  } 

  componentWillReceiveProps(newProps) {

                  
   }
   UploadFiles=()=>{
     const{dispatch}=this.props;
     dispatch({type:ACTION.FILEUPLOAD.UPLOAD,data:this.state.filecontent});
   }

  render() {
    return (
      <div>   
        <form encType="multipart/form-data" action="">             
        <input id="myfiles" multiple onChange={this.pullfiles.bind(this)} type="file"></input>
        <input type="button" onClick={this.UploadFiles} value="Upload" />
        </form>
        <div> here
            {this.state.filecontent.length!=0  && this.state.filecontent.map((nameset,index)=>
               { return  <div key={index}>{nameset.name}</div>
                    })
              }
        </div>
    </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    multiplefile: state.multiplefile
  };
};

export default connect(mapStateToProps)(Fileupload);