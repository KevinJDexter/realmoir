import React, { Component } from 'react';
import { connect } from 'react-redux';

class Sidebar extends Component {
  render () {
    return (
      <div>
        <h3 style={{textAlign: 'center'}}>Recently Added</h3>
      </div>
    )
  }
}

export default Sidebar;