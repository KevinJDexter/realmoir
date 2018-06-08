import React, { Component } from 'react';
import Header from '../Header/Header';
import WorldEditLayout from '../EditPageLayouts/WorldEditLayout';
import StoryEditLayout from '../EditPageLayouts/StoryEditLayout';
import Sidebar from '../Sidebar/Sidebar';

import './EditPage.css';

class EditPage extends Component {
  render () {

    let componentToMount = <div></div>
    if (this.props.match.params.type === 'world') {
      componentToMount = <WorldEditLayout match={this.props.match} history={this.props.history} />
    } else if (this.props.match.params.type === 'story') {
      componentToMount = <StoryEditLayout match={this.props.match} history={this.props.history} />
    }

    return (
      <div style={{ width: window.innerWidth, height: window.innerHeight }}>
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

export default EditPage;