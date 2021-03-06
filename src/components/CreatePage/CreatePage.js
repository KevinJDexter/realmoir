import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import CreatePageSidebar from '../CreatePageSidebar/CreatePageSidebar';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';
import WorldForm from '../CreatePageForms/WorldForm';

import './CreatePage.css';
import StoryForm from '../CreatePageForms/StoryForm';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import LocationForm from '../CreatePageForms/LocationForm';
import CharacterForm from '../CreatePageForms/CharacterForm';
import EventForm from '../CreatePageForms/EventForm';
import { CREATE_PAGE_ACTIONS } from '../../redux/actions/createPageActions';

const mapStateToProps = (reduxState) => ({ createReducer: reduxState.create, user: reduxState.user })

class CreatePage extends Component {

  componentDidMount() {
    if (!this.props.user.userName && !this.props.user.isLoading) {
      this.props.history.push('/login');
    }
    this.props.dispatch({ type: WORLD_ACTIONS.GET_WORLDS })
  }

  componentWillMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER })
  }

  componentWillUnmount() {
    this.props.dispatch({ type: CREATE_PAGE_ACTIONS.CLEAR_FORM_INFO });
  }

  render() {
    let formToDisplay = <div></div>;
    if (this.props.createReducer.formType === 'world') {
      formToDisplay = <WorldForm history={this.props.history} />;
    } else if (this.props.createReducer.formType === 'story') {
      formToDisplay = <StoryForm history={this.props.history} />
    } else if (this.props.createReducer.formType === 'location') {
      formToDisplay = <LocationForm history={this.props.history} />
    } else if (this.props.createReducer.formType === 'character') {
      formToDisplay = <CharacterForm history={this.props.history} />
    } else if (this.props.createReducer.formType === 'event') {
      formToDisplay = <EventForm history={this.props.history} />
    }

    return (
      <div style={{ height: window.innerHeight, display: "flex", flexDirection: "column" }}>
        <Header history={this.props.history} />
        <div className="mainView">
          <div className="createSidebarDiv">
            <CreatePageSidebar />
          </div>
          <div className="createPageContent">
            <h2>Create</h2>
            {formToDisplay}
          </div>
          <div className="sidebarDiv">
            <Sidebar />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(CreatePage);