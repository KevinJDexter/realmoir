import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';

import './BrowsePage.css';
import WorldOption from '../BrowseObjectOptions/WorldOption';
import StoryOption from '../BrowseObjectOptions/StoryOption';
import LocationOption from '../BrowseObjectOptions/LocationOption';
import AfterWorldObjectOption from '../BrowseObjectOptions/AfterWorldObjectOption';
import AfterStoryObjectOption from '../BrowseObjectOptions/AfterStoryObjectOption';

const mapStateToProps = (reduxState) => ({
  worldReducer: reduxState.worlds,
  storyReducer: reduxState.stories,
  browse: reduxState.browse,
  locationReducer: reduxState.locations,
})

class BrowsePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      afterWorldObjectOptions: [
        'Location',
        'Story',
      ],
      afterStoryObjectOptions: [
        'Location',
      ],
    }
  }

  componentWillMount = () => {
    this.props.dispatch({ type: WORLD_ACTIONS.GET_WORLDS });
  }

  render() {

    let storyDiv = <div></div>
    if (this.props.browse.afterWorldOption === 'story') {
      if (this.props.storyReducer.storiesInWorld.length === 0) {
        storyDiv = <div>
          <h3>There Are No Stories Here Yet</h3>
        </div>
      } else {
        storyDiv = <div>
          <h3 className="browseLineHead" >Select a Story</h3>
          <div className="objectContent">
            {this.props.storyReducer.storiesInWorld.map(story => <StoryOption key={story.id} story={story} />)}
          </div>
          <hr className="browseLineBreak" />
        </div>
      }
    }

    let locationDiv = <div></div>
    if (this.props.browse.afterWorldOption === 'location' || this.props.browse.afterStoryOption === 'location') {
      let locationList = this.props.locationReducer.locationsInWorld.map(location => <LocationOption key={location.id} location={location} />)
      if (this.props.browse.afterStoryOption === 'location') {
        locationList = this.props.locationReducer.locationsInStory.map(location => <LocationOption key={location.id} location={location} />)
      }
      if (locationList.length === 0) {
        locationDiv = <div>
          <h3 className="browseLineHead" >There Are No Locations Here Yet</h3>
        </div>
      } else {
        locationDiv = <div>
          <h3 className="browseLineHead" >Select a Location</h3>
          <div className="objectContent">
            {locationList}
          </div>
          <hr className="browseLineBreak" />
        </div>
      }
    }

    let worldSelectedDiv = <div></div>
    if (this.props.browse.world.id) {
      worldSelectedDiv = <div>
        <h3 className="browseLineHead" >Select an Object</h3>
        <div className="objectContent">
          {this.state.afterWorldObjectOptions.map(option => <AfterWorldObjectOption key={option} option={option} />)}
        </div>
        <hr className="browseLineBreak" />
      </div>
    }

    let storySelectedDiv = <div></div>;
    if (this.props.browse.story.id) {
      storySelectedDiv = <div>
        <h3 className="browseLineHead" >Select an Object</h3>
        <div className="objectContent">
          {this.state.afterStoryObjectOptions.map(option => <AfterStoryObjectOption key={option} option={option} />)}
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
            <h3 className="browseLineHead" >Select a World</h3>
            <div className="objectContent">
              {this.props.worldReducer.worlds.map(world => <WorldOption key={world.id} world={world} />)}
            </div>
            <hr className="browseLineBreak" />
            {worldSelectedDiv}
            {storyDiv}
            {storySelectedDiv}
            {locationDiv}
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