import React from 'react';
import './header.less';
import { Link } from 'react-router-dom';
import SettingImage from '../../../assets/images/setting.png';
import NotificationImage from '../../../assets/images/notification.png';
import ProfileIcon from '../../../assets/images/profile.png';
import Logo from '../../../assets/images/logo.png';
import {connect} from 'react-redux';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            active:"link-header-active",
            noactive:"link-header-unactive",
        }
    }

    changeTabStyle=(type,event)=>{
        if(type=="1"){
            this.setState({
                active:"link-header-unactive",
                noactive:"link-header-active",
            })
        }
        else if(type=="2"){
            this.setState({
                active:"link-header-active",
                noactive:"link-header-unactive",
            })
        }
    
    }
    
    render(){
            const picture_profile=localStorage.getItem("profile");
        return(
            <div className="topnav">
            <img src={Logo} style={{marginLeft:'60px'}}/> 
            <div>
            {localStorage.getItem("name")=="" && <img src={ProfileIcon} style={{height:'20px'}} className="image-tabbar"></img>}
            {localStorage.getItem("profile")!="" && <img src={picture_profile} style={{height:'40px'}} className="image-tabbar"></img> }
            {/* <img src={NotificationImage} style={{height:'20px'}} className="image-tabbar"></img>
            <img src={SettingImage} style={{height:'20px'}} className="image-tabbar"></img> */}
            <div className="name-tabbar">{this.props.dashboard && <span> {localStorage.getItem("name")} </span>}</div>
            <Link className="link-header-animation"   to="/" >Animation</Link>
            <Link className="link-header-video"   to="/" >Video</Link>
            <Link className={this.state.noactive} onClick={this.changeTabStyle.bind(this,"1")} to="" >Fonts</Link>
            <Link className={this.state.active} onClick={this.changeTabStyle.bind(this,"2")} to="">Assets File</Link>           
            </div>
            </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
      dashboard:state.dashboard,
    };
  };
  
  export default connect(mapStateToProps)(Header);