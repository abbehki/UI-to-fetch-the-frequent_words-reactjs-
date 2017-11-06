import React from 'react';
import {Link} from 'react-router';

class errorMessage extends React.Component{
    constructor(props){
        super(props);
        const {errorMsg} = props;
    }

    render(){
        return(
             <div className="error-msg-wrp">
                <div className="error-msg">{errorMsg}</div>                 
            </div> 
        );
    }
}

export default errorMessage;