import React from 'react';
import './side_nav_bar.less';
import {Link} from 'react-router';

class SideNavBar extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
             <div className="side-nav-cont">
                <div className="side-menu">
                            <div className="menu-text">Dashboard</div>                                                
                 </div>
                   
                              
            </div> 
        );
    }
}

export default SideNavBar;