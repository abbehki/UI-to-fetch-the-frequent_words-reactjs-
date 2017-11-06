import React from 'react';
import {connect} from 'react-redux';
import Header from '../header/header';
import SideNavBar from '../side_nav_bar/side_nav_bar';

class MenuBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
             <div className="menu-bar-cont">
                 <Header></Header>
              <SideNavBar></SideNavBar>
            </div> 
        );
    }
}

export default MenuBar;