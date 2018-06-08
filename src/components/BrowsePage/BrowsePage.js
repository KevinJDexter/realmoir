import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';

import './BrowsePage.css';
import WorldOption from '../BrowseObjectOptions/WorldOption';
import StoryOption from '../BrowseObjectOptions/StoryOption';

const mapStateToProps = (reduxState) => ({ worldReducer: reduxState.worlds, storyReducer: reduxState.stories, browse: reduxState.browse })

class BrowsePage extends Component {

  componentWillMount = () => {
    this.props.dispatch({ type: WORLD_ACTIONS.GET_WORLDS });
  }

  render() {

    let storyDiv = <div></div>
    if (this.props.browse.world.id) {
      storyDiv = <div>
        <div className="objectContent">
        {this.props.storyReducer.storiesInWorld.map(story => <StoryOption key={story.id} story={story} />)}
      </div>
      <hr className="browseLineBreak" />
      </div>
    }

    return (
      <div style={{ height: window.innerHeight, width: window.innerWidth }}>
        <Header title="Realmoir" history={this.props.history} />
        <div className="mainView" >
          <div className="browsePageContent" >
            <h2>Browse</h2>
            <hr className="browseLineBreak" />
            <div className="objectContent">
              {this.props.worldReducer.worlds.map(world => <WorldOption key={world.id} world={world} />)}
            </div>
            <hr className="browseLineBreak" />
            {storyDiv}
          </div>
          <div className="sidebarDiv">
            <Sidebar />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(BrowsePage);