import React from 'react';
import './loader.less';
import {Link} from 'react-router';

class Loader extends React.Component{
    constructor(props){
        super(props);
        const errorMsg = props;
    }

    render(){
        return(
             <div className="loader-cont">
                 <div className="overlay"></div>
                <div className="loader"><img src="app/assets/images/loader.gif"/></div>                 
            </div> 
        )
    }
}

export default Loader;