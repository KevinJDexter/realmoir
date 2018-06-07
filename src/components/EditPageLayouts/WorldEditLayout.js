import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToRedux = (reduxState) => ({reduxState});

class WorldEditLayout extends Component {
  render() {
    return (
      <h3>World Edit Layout</h3>
    )
  }
}

export default connect(mapStateToRedux)(WorldEditLayout)