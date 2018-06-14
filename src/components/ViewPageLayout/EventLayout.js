import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { EVENT_ACTIONS } from '../../redux/actions/eventActions';

const mapStateToProps = (reduxState) => ({
  eventReducer: reduxState.events,
})

class LocationLayout extends Component {

  componentWillMount = () => {
    this.props.dispatch({
      type: EVENT_ACTIONS.GET_EVENT_DETAILS,
      payload: this.props.match.params.id,
    });
  }

  componentDidUpdate = () => {
    if (!this.props.eventReducer.isLoading && !this.props.eventReducer.eventDetails.id) {
      this.props.history.push('/home');
    }
    if (this.props.match.params.id !== String(this.props.eventReducer.eventDetails.id)) {
      this.props.dispatch({
        type: EVENT_ACTIONS.GET_EVENT_DETAILS,
        payload: this.props.match.params.id,
      })
    }
  }

  editEvent = () => {
    this.props.history.push(`/edit/event/${this.props.match.params.id}`);
  }

  render() {
    let details = { ...this.props.eventReducer.eventDetails };

    for (let key in details) {
      if (details[key] === null) {
        if (key !== 'location' && key !== 'location_id')
          details[key] = "N/A";
      }
    }

    let storiesContent = <li className="linkedElements">None</li>
    if (details.stories.length > 0) {
      storiesContent = details.stories.map(story => <Link className="linkedElements" key={story.id} to={`/view/story/${story.id}`} >{story.title}</Link>)
    }

    let charactersContent = <li className="linkedElements">None</li>
    if (details.characters.length > 0) {
      charactersContent = details.characters.map(character => <Link className="linkedElements" key={character.id} to={`/view/character/${character.id}`} >{character.name}</Link>)
    }

    let isPrivate, editButton, privateNotes;

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
      editButton = <Button onClick={this.editEvent} variant="contained" color="primary" >Edit Event</Button>;
      privateNotes = <div><h4>Notes:</h4><p>{details.private_notes}</p></div>;
      isPrivate = <div>
        <p><strong>Visibility:</strong> {visibility}</p>
        <p><strong>User setting:</strong> {userPrivate} - <strong>World setting:</strong> {worldPrivate} - <strong>Event Setting:</strong> {itemPrivate}</p>
      </div>
    }

    let locationLink = <p>N/A</p>;
    if (details.location !== null) {
      locationLink = <p><Link to={`/view/location/${details.location_id}`}>{details.location}</Link></p>
    }


    return (
      <div className="formContainer" >
        <h2>{details.name}</h2>
        <h4>Description</h4>
        <p>{details.description}</p>
        <h4>Date of Event</h4>
        <p>{details.date_of_event}</p>
        <h4>Location</h4>
        {locationLink}
        <h4>World</h4>
        <p><Link to={`/view/world/${details.world_id}`}>{details.world}</Link></p>
        {privateNotes}
        {isPrivate}
        <ul className="connectionList" >
          <li><strong>Stories:</strong></li>
          {storiesContent}
        </ul>
        <ul className="connectionList" >
          <li><strong>Related Characters:</strong></li>
          {charactersContent}
        </ul>
        {editButton}
      </div>
    )
  }
}

export default connect(mapStateToProps)(LocationLayout);