import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STORY_ACTIONS } from '../../redux/actions/storyActions';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Moment from 'react-moment';

const mapStateToRedux = (reduxState) => ({
  storyReducer: reduxState.stories,
})

class StoryLayout extends Component {

  componentWillMount = () => {
    this.props.dispatch({
      type: STORY_ACTIONS.GET_STORY_DETAILS,
      payload: this.props.match.params.id,
    })
  }

  componentDidUpdate = () => {
    if (!this.props.storyReducer.isLoading && !this.props.storyReducer.storyDetails.id) {
      this.props.history.push('/home');
    }
    if (this.props.match.params.id !== String(this.props.storyReducer.storyDetails.id)) {
      this.props.dispatch({
        type: STORY_ACTIONS.GET_STORY_DETAILS,
        payload: this.props.match.params.id,
      })
    }
  }

  componentWillUnmount = () => {
    this.props.dispatch({
      type: STORY_ACTIONS.CLEAR_STORY_DETAILS,
    })
  }

  editStory = () => {
    this.props.history.push(`/edit/story/${this.props.match.params.id}`)
  }

  render() {
    const details = { ...this.props.storyReducer.storyDetails };

    if (details.genre == null) {
      details.genre = "None";
    }

    let editButton, privateNotes, isPrivate;

    if (details.is_owner) {
      let visibility = "Public",
        userPrivate = "Public",
        worldPrivate = "Public",
        itemPrivate = "Public";
      if (details.is_private || details.world_private || details.user_private) {
        visibility = "Private";
      }
      if (details.is_private) {
        itemPrivate = "Private";
      }
      if (details.world_private) {
        worldPrivate = "Private";
      }
      if (details.user_private) {
        userPrivate = "Private";
      }
      editButton = <Button onClick={this.editStory} variant="contained" color="primary" >Edit Story</Button>;
      privateNotes = <div><h4>Notes:</h4><p>{details.private_notes}</p></div>;
      isPrivate = <div>
        <p><strong>Visibility:</strong> {visibility}</p>
        <p><strong>User setting:</strong> {userPrivate} - <strong>World setting:</strong> {worldPrivate} - <strong>Story Setting:</strong> {itemPrivate}</p>
      </div>
    }

    let locationsContent = details.locations.map(location => <li key={location.id}><Link className="linkedElements" to={`/view/location/${location.id}`}>{location.name}</Link></li>)
    if (details.locations.length === 0) {
      locationsContent = <li className="linkedElements">None</li>
    }

    let charactersContent = details.characters.map(character => <li key={character.id}><Link className="linkedElements" to={`/view/character/${character.id}`}>{character.name}</Link></li>)
    if (details.characters.length === 0) {
      charactersContent = <li className="linkedElements">None</li>
    }

    let eventsContent = details.events.map(event => <li key={event.id}><Link className="linkedElements" to={`/view/event/${event.id}`}>{event.name}</Link></li>)
    if (details.events.length === 0) {
      eventsContent = <li className="linkedElements">None</li>
    }

    return (
      <div>
        <div className="formContainer" >
          <h2>{details.title}</h2>
          <h4>Synonpsis</h4>
          <p>{details.synopsis}</p>
          <h4>Genre</h4>
          <p>{details.genre}</p>
          <h4>World</h4>
          <p><Link to={`/view/world/${details.world_id}`}>{details.world}</Link></p>
          {privateNotes}
          {isPrivate}
          <ul className="connectionList">
            <li><strong>Characters:</strong></li>
            {charactersContent}
          </ul>
          <ul className="connectionList">
            <li><strong>Locations:</strong></li>
            {locationsContent}
          </ul>
          <ul className="connectionList">
            <li><strong>Events:</strong></li>
            {eventsContent}
          </ul>
          {editButton}
        </div>
        <p className="dateWatermark">Date Created: <Moment format="ddd MMM Do, YYYY HH:mm:ss">{details.date_created}</Moment></p>
      </div>
    )
  }

}

export default connect(mapStateToRedux)(StoryLayout);