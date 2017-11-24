import React from 'react';
import {Link} from 'react-router';
import ACTION from '../../action_constants';
import {connect} from 'react-redux';
import './search.less';

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            search_content:''
        }
    }

    onPressEnter=(event)=>{
        if(event.key=="Enter"){
            console.log("API call search content",event.target.value);
            const{dispatch}=this.props;
            dispatch({type:ACTION.SEARCH.SEARCH_TAGS,data:event.target.value})
            this.setState({
                search_content:''                
            })
        }
    }
    onChange=(event)=>{
        console.log(event.target.value);
        this.setState({
            search_content:event.target.value,
        })
    }

    render(){
        const{type}=this.props;

        return(
                 <div className="wrapper-search"> 
                      <input type="text" placeholder="Search" value={this.state.search_content} onChange={this.onChange.bind(this)} onKeyUp={this.onPressEnter.bind(this)} className="search" /> <div className="icon-icn_search search-image" ></div>
                 </div>
                  
        );
    }
}

const mapStateToProps = state => {
    return {
      dashboard: state.dashboard
    };
  };
  
  export default connect(mapStateToProps)(Search);