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
import CharacterOption from '../BrowseObjectOptions/CharacterOption';

const mapStateToProps = (reduxState) => ({
  worldReducer: reduxState.worlds,
  storyReducer: reduxState.stories,
  browse: reduxState.browse,
  locationReducer: reduxState.locations,
  characterReducer: reduxState.characters,
})

class BrowsePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      afterWorldObjectOptions: [
        'Location',
        'Story',
        'Character',
      ],
      afterStoryObjectOptions: [
        'Location',
        'Character',
      ],
    }
  }

  componentWillMount = () => {
    this.props.dispatch({ type: WORLD_ACTIONS.GET_WORLDS });
  }

  render() {

    let storyDiv;
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

    let locationDiv;
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

    let characterDiv;
    if (this.props.browse.afterWorldOption === 'character' || this.props.browse.afterStoryOption === 'character') {
      let characterList = this.props.characterReducer.charactersInWorld.map(character => <CharacterOption key={character.id} character={character} />)
      if (this.props.browse.afterStoryOption === 'character') {
        characterList = this.props.characterReducer.charactersInStory.map(character => <CharacterOption key={character.id} character={character} />)
      }
      if (characterList.length === 0) {
        characterDiv = <div>
          <h3 className="browseLineHead" >There Are No Characters Here Yet</h3>
        </div>
      } else {
        characterDiv = <div>
          <h3 className="browseLineHead" >Select a Character</h3>
          <div className="objectContent">
            {characterList}
          </div>
          <hr className="browseLineBreak" />
        </div>
      }
    }

    let worldSelectedDiv;
    if (this.props.browse.world.id) {
      worldSelectedDiv = <div>
        <h3 className="browseLineHead" >Select an Object</h3>
        <div className="objectContent">
          {this.state.afterWorldObjectOptions.map(option => <AfterWorldObjectOption key={option} option={option} />)}
        </div>
        <hr className="browseLineBreak" />
      </div>
    }

    let storySelectedDiv;
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
            {characterDiv}
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