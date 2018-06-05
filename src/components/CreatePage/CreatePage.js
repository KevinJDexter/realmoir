import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import CreatePageSidebar from '../CreatePageSidebar/CreatePageSidebar';

class CreatePage extends Component {
  render() {
    return (
      <div>
        <Header title="Realmoir" history={this.props.history} />
        <h2>Create Page</h2>
        <div className="mainView">
          <div style={{flex: 2, margin: "10px"}}>
            <CreatePageSidebar />
          </div>
          <div style={{flex: 4}}>
            <div>
            </div>
          </div>
          <div className="sidebarDiv">
            <Sidebar />
          </div>
        </div>
      </div>
    )
  }
}

export default CreatePage;