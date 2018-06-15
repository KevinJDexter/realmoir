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
import EventOption from '../BrowseObjectOptions/EventOption';
import { BROWSE_ACTIONS } from '../../redux/actions/browseActions';

const mapStateToProps = (reduxState) => ({
  worldReducer: reduxState.worlds,
  storyReducer: reduxState.stories,
  browse: reduxState.browse,
  locationReducer: reduxState.locations,
  characterReducer: reduxState.characters,
  eventReducer: reduxState.events,
})

class BrowsePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      afterWorldObjectOptions: [
        'Location',
        'Story',
        'Character',
        'Event',
      ],
      afterStoryObjectOptions: [
        'Location',
        'Character',
        'Event',
      ],
    }
  }

  componentWillMount = () => {
    this.props.dispatch({ type: WORLD_ACTIONS.GET_WORLDS });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: BROWSE_ACTIONS.CLEAR_BROWSE_INFO });
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

    let eventDiv;
    if (this.props.browse.afterWorldOption === 'event' || this.props.browse.afterStoryOption === 'event') {
      let eventList = this.props.eventReducer.eventsInWorld.map(event => <EventOption key={event.id} event={event} />)
      if (this.props.browse.afterStoryOption === 'event') {
        eventList = this.props.eventReducer.eventsInStory.map(event => <EventOption key={event.id} event={event} />)
      }
      if (eventList.length === 0) {
        eventDiv = <div>
          <h3 className="browseLineHead" >There Are No Events Here Yet</h3>
        </div>
      } else {
        eventDiv = <div>
          <h3 className="browseLineHead" >Select an Event</h3>
          <div className="objectContent">
            {eventList}
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
      <div style={{ height: window.innerHeight, display: "flex", flexDirection: "column" }}>
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
            {characterDiv}
            {locationDiv}
            {eventDiv}
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