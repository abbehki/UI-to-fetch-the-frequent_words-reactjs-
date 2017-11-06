import React from 'react';
import './header.less';
import {Link} from 'react-router';

class Header extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
             <div className="top-nav-cont">
                <div className="top-nav-logo">ASSET MANAGEMENT</div> 
                <div className="notification-img"></div>
            </div> 
        );
    }
}

export default Header;