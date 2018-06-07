import React, {Component} from 'react';
import {connect} from 'react-redux';

const mapStateToRedux = (reduxState) => ({reduxState});

class StoryEditLayout extends Component {
  render() {
    return (
      <h3>Story Edit Layout</h3>
    )
  }
}

export default connect(mapStateToRedux)(StoryEditLayout);