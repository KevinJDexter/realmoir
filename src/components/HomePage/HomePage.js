import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';
import { STORY_ACTIONS } from '../../redux/actions/storyActions';
import LinkToWorld from '../LinkToWorld/LinkToWorld';
import LinkToStory from '../LinkToStory/LinkToStory';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';
import { Link } from 'react-router-dom';
import CreateWorldsDropdown from '../CreateWorldsDropdown/CreateWorldsDropdown';
import CreateStoriesDropdown from '../CreateStoriesDropdown/CreateStoriesDropdown';
import Sidebar from '../Sidebar/Sidebar';

import './HomePage.css'

const mapStateToProps = (reduxState) => ({ worldsReducer: reduxState.worlds, storiesReducer: reduxState.stories, browseReducer: reduxState.browse, user: reduxState.user })

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storiesCollected: false,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  updateWindowDimensions = () => {
    if (window.innerWidth !== this.state.width || window.innerHeight !== this.state.height) {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: WORLD_ACTIONS.GET_WORLDS })
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  componentWillMount = () => {
    window.addEventListener("resize", this.updateWindowDimensions)
  }


  componentDidUpdate() {
    if (!this.props.worldsReducer.isLoading
      && this.props.worldsReducer.worlds.length !== 0
      && !this.state.storiesCollected) {
      this.props.dispatch({ type: STORY_ACTIONS.GET_STORIES });
      this.setState({ storiesCollected: true });
    }
  }

  render() {
    let storiesCreateOptions = <div></div>
    let createOptions = <Link to="/login">Start Creating</Link>

    if (this.props.browseReducer.storiesInWorld.length > 0) {
      storiesCreateOptions = <div>
        <CreateStoriesDropdown />
        <Link className="createNewLink" to="/create">Create new Story</Link>
      </div>;
    }

    if (this.props.user.userName) {
      createOptions = <div>
        <CreateWorldsDropdown />
        <Link className="createNewLink" to="/create">Create new World</Link>
        <br />
        {storiesCreateOptions}
      </div>
    }

    return (
      <div style={{height: this.state.height, width: this.state.width, display: "flex", flexDirection: "column"}}>
        <Header title="Realmoir" history={this.props.history} />
        <div className="mainView">
          <div className="homePageContent">
            <div className="homeWelcomeDiv">
            <WelcomeMessage />
            </div>
            <br />
            <br />
            <div class="homeBottomFlexForm">
              <div className="homeBrowseDiv">
                <h3>Browse</h3>
                <div className="homeBrowseInnerDiv">
                  <div className="homeBrowseChildDiv">
                    <h4>Worlds</h4>
                    {this.props.worldsReducer.worlds.map(world => <LinkToWorld key={world.id} world={world} />)}
                    <Link to="/browse">See More...</Link>
                  </div>
                  <div className="homeBrowseChildDiv">
                    <h4>Stories</h4>
                    {this.props.storiesReducer.stories.map(story => <LinkToStory key={story.id} story={story} />)}
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