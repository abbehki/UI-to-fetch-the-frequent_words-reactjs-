import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../action_constants';
import { Link } from 'react-router-dom';

class Frequency extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        index:1,
    }
  }

    onchange=(event)=>{
        this.setState({
            index:event.target.value
        })
    }

    onclickevent=(event)=>{
        //dispatch 
        const{dispatch}=this.props;
        dispatch({type:ACTION.CHECK.LOAD,data:this.state.index});
    }
    render() {
        return (
        <div>  
            ENTER THE NUMBER IN INPUT BOX:    
            <input type="number" onChange={this.onchange.bind(this)}/>
            <button onClick={this.onclickevent.bind(this)}>Submit</button>
            {
                this.props.check_reducer && <div>
                    <div>{this.props.check_reducer.load}</div><br></br>
                    <a href=" http://terriblytinytales.com/test.txt">Fetch from this link txt</a>
                 </div>
            }
        </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {
    check_reducer: state.check_reducer
  };
};
export default connect(mapStateToProps)(Frequency);
