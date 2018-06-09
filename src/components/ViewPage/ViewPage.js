import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import './ViewPage.css';
import WorldLayout from '../ViewPageLayout/WorldLayout';
import StoryLayout from '../ViewPageLayout/StoryLayout';

class ViewPage extends Component {

  render() {

    let componentToMount = <div></div>
    if (this.props.match.params.type === 'world') {
      componentToMount = <WorldLayout match={this.props.match} history={this.props.history} />
    } else if (this.props.match.params.type === 'story') {
      componentToMount = <StoryLayout match={this.props.match} history={this.props.history} />
    } else if (this.props.match.params.type === 'location') {
      
    }

    return (
      <div style={{width: window.innerWidth, height: window.innerHeight }}>
        <Header title="Realmoir" history={this.props.history} />
        <div className="mainView">
          <div className="viewPageContent">
            {componentToMount}
          </div>
          <div className="sidebarDiv">
            <Sidebar />
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(ViewPage);