import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import './ViewPage.css';
import WorldLayout from '../ViewPageLayout/WorldLayout';
import StoryLayout from '../ViewPageLayout/StoryLayout';

const mapStateToProps = (reduxState) => ({ user: reduxState.user })

class ViewPage extends Component {

  componentWillMount = () => {
    // if (!this.props.user.userName && !this.props.user.isLoading) {
    //   this.props.history.push('/login');
    // }
  }


  render() {

    let componentToMount = <div></div>
    if (this.props.match.params.type === 'world') {
      componentToMount = <WorldLayout />
    } else if (this.props.match.params.type === 'story') {
      componentToMount = <StoryLayout match={this.props.match} />
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
        {JSON.stringify(this.props.match.params)}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ViewPage);