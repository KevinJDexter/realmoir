import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';
import { STORY_ACTIONS } from '../../redux/actions/storyActions';
import { CREATE_PAGE_ACTIONS } from '../../redux/actions/createPageActions';
import LinkToWorld from '../LinkToWorld/LinkToWorld';
import LinkToStory from '../LinkToStory/LinkToStory';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import { Link } from 'react-router-dom';
import CreateWorldsDropdown from '../CreateWorldsDropdown/CreateWorldsDropdown';
import CreateStoriesDropdown from '../CreateStoriesDropdown/CreateStoriesDropdown';
import Sidebar from '../Sidebar/Sidebar';

import './HomePage.css'

const mapStateToProps = (reduxState) => ({ worldsReducer: reduxState.worlds, storiesReducer: reduxState.stories, browseReducer: reduxState.browse, user: reduxState.user, createReducer: reduxState.create })

class HomePage extends Component {

  componentDidMount() {
    this.props.dispatch({ type: WORLD_ACTIONS.GET_WORLDS })
    this.props.dispatch({ type: STORY_ACTIONS.GET_STORIES })
  }

  setCreateTypeStory = () => {
    this.props.dispatch({ type: CREATE_PAGE_ACTIONS.SET_FORM_TYPE_STORY })
  }

  setCreateTypeWorld = () => {
    this.props.dispatch({ type: CREATE_PAGE_ACTIONS.SET_FORM_TYPE_WORLD })
  }

  render() {
    let storiesCreateOptions = <div></div>
    let createOptions = <Link to="/login">Start Creating</Link>

    if (this.props.createReducer.world.id) {
      if (this.props.storiesReducer.storiesInWorld.length > 0) {
        storiesCreateOptions = <div>
          <CreateStoriesDropdown />
          <Link className="homeCreateNewLink" to="/create" onClick={this.setCreateTypeStory} >Create new Story</Link>
        </div>;
      } else {
          storiesCreateOptions = <div><br /><br /><Link className="homeCreateNewLink" to="/create" onClick={this.setCreateTypeStory} >Create a Story!</Link></div>
      }
    }

    if (this.props.user.userName) {
      if (this.props.worldsReducer.worlds.length > 0) {
        createOptions = <div>
          <CreateWorldsDropdown />
          <Link className="homeCreateNewLink" to="/create" onClick={this.setCreateTypeWorld} >Create new World</Link>
          <br />
          {storiesCreateOptions}
        </div>
      } else {
        createOptions = <Link className="homeCreateNewLink" to="/create" onClick={this.setCreateTypeWorld} >Start Creating Now!</Link>
      }

    }

    let worldBrowseOptions = this.props.worldsReducer.worlds.slice(0, 5);
    let storyBrowseOptions = this.props.storiesReducer.stories.slice(0, 5);

    return (
      <div style={{ height: window.innerHeight, width: window.innerWidth, display: "flex", flexDirection: "column" }}>
        <Header title="Realmoir" history={this.props.history} />
        <div className="mainView">
          <div className="homePageContent">
            <div className="homeWelcomeDiv">
              <WelcomeMessage />
            </div>
            <br />
            <br />
            <div className="homeBottomFlexForm">
              <div className="homeBrowseDiv">
                <h3>Browse</h3>
                <div className="homeBrowseInnerDiv">
                  <div className="homeBrowseChildDiv">
                    <h4>Worlds</h4>
                    {worldBrowseOptions.map(world => <LinkToWorld key={world.id} world={world} />)}
                    <Link to="/browse">See More...</Link>
                  </div>
                  <div className="homeBrowseChildDiv">
                    <h4>Stories</h4>
                    {storyBrowseOptions.map(story => <LinkToStory key={story.id} story={story} />)}
                    <Link to="/browse">See More...</Link>
                  </div>
                </div>
              </div>
              <div className="homeCreateDiv">
                <h3>Create</h3>
                {createOptions}
              </div>
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

export default connect(mapStateToProps)(HomePage);