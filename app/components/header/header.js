import React from 'react';
import './header.less';
import { Link } from 'react-router-dom';
import SettingImage from '../../../assets/images/setting.png';
import NotificationImage from '../../../assets/images/notification.png';
import ProfileIcon from '../../../assets/images/profile.png';
import Logo from '../../../assets/images/logo.png';


class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="topnav">
            <img src={Logo} style={{marginLeft:'60px'}}/> 
            <div>
            <img src={ProfileIcon} style={{height:'20px'}} className="image-tabbar"></img>
            {/* <img src={NotificationImage} style={{height:'20px'}} className="image-tabbar"></img>
            <img src={SettingImage} style={{height:'20px'}} className="image-tabbar"></img> */}
            <div className="name-tabbar">Abhay Behki</div>
            <Link className="link-header-animation"   to="/" >Animation</Link>
            <Link className="link-header-video"   to="/" >Video</Link>
            <Link className="link-header-unactive"   to="/" >Fonts</Link>
            <Link className="link-header-active"     to="/dashboard" >Assets File</Link>           
            </div>
            </div> 
        );
    }
}

export default Header;