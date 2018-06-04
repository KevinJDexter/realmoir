import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';

class ViewPage extends Component {
  render () {
    return (
      <div>
        <Header title="Realmoir" history={this.props.history} />
        <h2>View Page</h2>
      </div>
    )
  }
}

export default ViewPage;