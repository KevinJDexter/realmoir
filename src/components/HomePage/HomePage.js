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

const mapStateToProps = (reduxState) => ({ worldsReducer: reduxState.worlds, storiesReducer: reduxState.stories, browseReducer: reduxState.browse })

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storiesCollected: false,
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: WORLD_ACTIONS.GET_WORLDS })
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
    console.log("STORIES", this.props.worldsReducer.stories);

    let storiesCreateOptions = <div></div>

    if (this.props.browseReducer.storiesInWorld.length > 0) {
      storiesCreateOptions = <div>
        <CreateStoriesDropdown />
        <Link className="createNewLink" to="/create">Create new Story</Link>
      </div>;
    }

    return (
      <div>
        <Header title="Realmoir" history={this.props.history} />
        <div className="mainView">
          <div className="pageContent">
            <WelcomeMessage />
            <br />
            <br />
            <div style={{ display: 'flex' }}>
              <div style={{ flex: '1', textAlign: 'center', border: 'solid black 3px', paddingBottom: '20px' }}>
                <h3>Browse</h3>
                <div style={{ display: 'flex' }}>
                  <div style={{ flex: '1' }}>
                    <h4>Worlds</h4>
                    {this.props.worldsReducer.worlds.map(world => <LinkToWorld key={world.id} world={world} />)}
                    <Link to="/browse">See More...</Link>
                  </div>
                  <div style={{ flex: '1' }}>
                    <h4>Stories</h4>
                    {this.props.storiesReducer.stories.map(story => <LinkToStory key={story.id} story={story} />)}
                    <Link to="/browse">See More...</Link>
                  </div>
                </div>
              </div>
              <div style={{ flex: '1', textAlign: 'center', border: 'solid black 3px', paddingBottom: '20px' }}>
                <h3>Create</h3>
                <CreateWorldsDropdown />
                <Link className="createNewLink" to="/create">Create new World</Link>
                <br />
                {storiesCreateOptions}
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