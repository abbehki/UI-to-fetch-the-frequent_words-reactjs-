import React from 'react';
import {connect} from 'react-redux';
import ACTION from '../action_constants';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';


const styles = {
  heading: {
    fontWeight: 'bold',
    color: 'red'
  }
};


@injectSheet(styles) // do this, else the styles won't come... very important
class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Link to="/about" >about</Link>
        <h1 className={classes.heading}>You are on the home page..</h1>
        {this.props.home.load }
      </div>
    );
  }
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type:"ACTION.HOME.GETHOME"});
  }
}

const mapStateToProps = state => {
  return {
    home: state.home
  };
};

export default connect(mapStateToProps)(Home);