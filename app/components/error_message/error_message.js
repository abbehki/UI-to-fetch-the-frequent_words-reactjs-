import React from 'react';
import {Link} from 'react-router';

class errorMessage extends React.Component{
    constructor(props){
        super(props);
        const {errorMsg} = props;
        console.error("Yolo--------------<<>>",errorMsg)
    }

    render(){
        return(
             <div className="error-msg-wrp">
                <div className="error-msg">{this.props.errorMsg}</div>                 
            </div> 
        );
    }
}

export default errorMessage;