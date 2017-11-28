import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../action_constants';
const appleImage = require('../../assets/images/apple.jpg');
import { Link } from 'react-router-dom';
import './test.less';
import injectSheet from 'react-jss';
import Foldergrid from  '../../assets/images/group-17.png';


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

  render() {
    const {classes} = this.props;
    return (
      <div className="container">
           <img scr={Foldergrid} className="file-image"/>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    about: state.about
  };
};
export default connect(mapStateToProps)(About);
