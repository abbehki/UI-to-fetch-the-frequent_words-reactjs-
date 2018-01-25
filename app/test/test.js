import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../action_constants';
const appleImage = require('../../assets/images/apple.jpg');
import { Link } from 'react-router-dom';
import './test.less';
import injectSheet from 'react-jss';
import Foldergrid from  '../../assets/images/group-17.png';
import LineChart from 'react-linechart';
import '../../node_modules/react-linechart/dist/styles.css';

const styles = {
  block: {
    color: 'blue'
  },
  img: {
    width: '100%'
  }
};

@injectSheet(styles) // do this, else the styles won't come... very important
class About extends React.Component {
  constructor(props) {
    super(props);
  }
  onpointclick=(event, point)=>{
     console.log("event",point);
  }

  render() {
    const data = [
      {									
          color: "steelblue", 
          points: [{x: 1, y: 2}, {x: 3, y: 5}, {x: 7, y: -3}] 
      }
  ];
     const {classes} = this.props;
    return (
      <div>
<div className="App">
<h1>My First LineChart</h1>
<LineChart 
    width={600}
    height={400}
    data={data}
    onPointClick={this.onpointclick.bind(this)}
    onPointHover
/>
</div>      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    about: state.about
  };
};
export default connect(mapStateToProps)(About);
