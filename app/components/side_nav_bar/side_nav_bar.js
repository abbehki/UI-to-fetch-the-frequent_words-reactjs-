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
                   <input type="text" placeholder="search" className="search" />  
                  
             </div>     
        );
    }
}

export default SideNavBar;