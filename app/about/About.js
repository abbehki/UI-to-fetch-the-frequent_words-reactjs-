import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../action_constants';
const appleImage = require('../../assets/images/apple.jpg');
import { Link } from 'react-router-dom';

import injectSheet from 'react-jss';

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
      <div className={classes.block}>      
        <h5>List of Projects</h5>
        <Link to="/dummy">dummy</Link>
        <h5>This is an apple below.... see. nice naa?</h5>
        
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
