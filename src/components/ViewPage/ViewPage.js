import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import './ViewPage.css';
import WorldLayout from '../ViewPageLayout/WorldLayout';
import StoryLayout from '../ViewPageLayout/StoryLayout';
import LocationLayout from '../ViewPageLayout/LocationLayout';
import CharacterLayout from '../ViewPageLayout/CharacterLayout';
import EventLayout from '../ViewPageLayout/EventLayout';

class ViewPage extends Component {

  render() {

    let componentToMount = <div></div>
    if (this.props.match.params.type === 'world') {
      componentToMount = <WorldLayout match={this.props.match} history={this.props.history} />
    } else if (this.props.match.params.type === 'story') {
      componentToMount = <StoryLayout match={this.props.match} history={this.props.history} />
    } else if (this.props.match.params.type === 'location') {
      componentToMount = <LocationLayout match={this.props.match} history={this.props.history} />
    } else if (this.props.match.params.type === 'character') {
      componentToMount = <CharacterLayout match={this.props.match} history={this.props.history} />
    } else if (this.props.match.params.type === 'event') {
      componentToMount = <EventLayout match={this.props.match} history={this.props.history} />
    }

    return (
      <div style={{ height: window.innerHeight, display: "flex", flexDirection: "column" }}>
        <Header title="Realmoir" history={this.props.history} />
        <div className="mainView" >
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