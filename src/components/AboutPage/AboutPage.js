import React, { Component } from 'react';
import Header from '../Header/Header';

class AboutPage extends Component {
  render () {
    return (
      <div>
        <Header title="Realmoir" history={this.props.history} />
        <h2>About Page</h2>
      </div>
    )
  }
}

export default AboutPage;