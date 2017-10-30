import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../action_constants';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import CONSTANT from '../common_constants';
import { GoogleLogin } from 'react-google-login-component';
import './auth.less';


const styles = {
  heading: {
    fontWeight: 'bold',
    color: 'red'
  }
};


@injectSheet(styles) // do this, else the styles won't come... very important
class Auth extends React.Component {
  constructor(props) {
    super(props);
   // this.clientID = CONSTANT.CLIENT_ID;
  }

  
  responseGoogle = (googleUser) =>{
   const id_token = googleUser.getAuthResponse().id_token;
   const emailId = googleUser.getBasicProfile().getEmail();
   const name = googleUser.getBasicProfile().getGivenName();
   console.log(id_token);

   const paramObj = {
                      googleToken : id_token,
                      email : emailId                  
                    };
   const { dispatch } = this.props;
   dispatch({type : ACTION.SINGIN.SINGIN , data : {paramObj}});
  
 }

  render() {

    return (
      <div className="auth-container">       
        <div className="logo">Asset Managment</div>       
            <div className = "google-login-btn">
                <GoogleLogin socialId={this.clientID}
                             scope="profile"
                             className="google-btn"
                             responseHandler={this.responseGoogle}
                             buttonText="Google Login"/>
            </div>           
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