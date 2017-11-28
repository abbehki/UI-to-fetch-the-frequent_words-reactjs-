import React from 'react';
import './side_nav_bar.less';
import {Link} from 'react-router';
import Search from '../search/search'

class SideNavBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            search_tags:'search_tags'
        }
    }

    render(){
        return(
            <div className="side-nav-cont">
                 <Search type={this.state.search_tags}/>
             </div>  
        );
    }
}

export default SideNavBar;