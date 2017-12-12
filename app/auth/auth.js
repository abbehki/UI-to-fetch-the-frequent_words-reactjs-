import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../action_constants';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import CONSTANT from '../common_constants';
import { GoogleLogin } from 'react-google-login-component';
import ErrorMsg from '../components/error_message/error_message';
import './auth.less';
import Logo from '../../assets/images/logo@2x.png';



class Auth extends React.Component {
  constructor(props) {
    super(props);
   // this.clientID = CONSTANT.CLIENT_ID;

  }

  
  responseGoogle = (googleUser) =>{
   const id_token = googleUser.getAuthResponse().id_token;
   const emailId = googleUser.getBasicProfile().getEmail();
   const name = googleUser.getBasicProfile().getGivenName();
   console.log("------->>>>>>",googleUser);
   const paramObjs= {
                      googleToken : id_token,
                      email : emailId,
                    };
   const { dispatch } = this.props;
   dispatch({type : ACTION.SINGIN.SINGIN , data : {paramObj:paramObjs,access_token:googleUser.getAuthResponse().access_token}});
 }

  render() {
    const style={
      backgroundImage:'black',
      height:'105px',
      width:'105px',
      display:'block',
      marginLeft: 'auto',
      marginRight:'auto',
      marginTop:'382px',
      marginBottom:'27px'
    }
    return (
      <div className="auth-container"> 
        <img src="" style={style}/>      
        <img src={Logo} className="logo"/> 
        <div className = "google-login-btn">
                <GoogleLogin socialId={this.clientID}
                             scope="email"
                             className="google-btn"
                             responseHandler={this.responseGoogle}
                             />
            
            </div>   
           {this.props.auth.authError && <ErrorMsg errorMsg={this.props.auth.authError}></ErrorMsg>}        
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Auth);