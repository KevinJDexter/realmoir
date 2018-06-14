import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';
import { Button } from '@material-ui/core';

const mapStateToRedux = (reduxState) => ({ worldReducer: reduxState.worlds })

class WorldLayout extends Component {

  componentWillMount = () => {
    this.props.dispatch({
      type: WORLD_ACTIONS.GET_WORLD_DETAILS,
      payload: this.props.match.params.id,
    })
  }

  componentDidUpdate = () => {
    if (!this.props.worldReducer.isLoading && !this.props.worldReducer.worldDetails.id) {
      this.props.history.push('/home');
    }
    if (this.props.match.params.id !== String(this.props.worldReducer.worldDetails.id)) {
      this.props.dispatch({
        type: WORLD_ACTIONS.GET_WORLD_DETAILS,
        payload: this.props.match.params.id,
      })
    }
  }

  componentWillUnmount = () => {
    this.props.dispatch({ 
      type: WORLD_ACTIONS.CLEAR_WORLD_DETAILS,
    })
  }

  editWorld = () => {
    this.props.history.push(`/edit/world/${this.props.match.params.id}`)
  }

  render() {
    const details = { ...this.props.worldReducer.worldDetails };

    let descriptionContent = details.description
    if (details.description == null) {
      descriptionContent = "None"
    }

    let storiesContent = details.stories.map(story => <li key={story.id}><Link className="linkedElements" to={`/view/story/${story.id}`}>{story.title}</Link></li>);
    if (details.stories.length === 0) {
      storiesContent = <li className="linkedElements">None</li>
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

    let editButton, privateNotes, isPrivate;

    if (details.is_owner) {
      let visibility = "Public",
        userPrivate = "Public",
        itemPrivate = "Public";
      if (details.is_private || details.user_private) {
        visibility = "Private";
      }
      if (details.is_private) {
        itemPrivate = "Private";
      }
      if (details.user_private) {
        userPrivate = "Private";
      }
      editButton = <Button onClick={this.editWorld} variant="contained" color="primary" >Edit World</Button>;
      privateNotes = <div><h4>Notes:</h4><p>{details.private_notes}</p></div>;
      isPrivate = <div>
        <p><strong>Visibility:</strong> {visibility}</p>
        <p><strong>User setting:</strong> {userPrivate} - <strong>World Setting:</strong> {itemPrivate}</p>
      </div>
    }

    return (
      <div className="formContainer" >
        <h2>{details.name}</h2>
        <h4>Description</h4>
        <p>{descriptionContent}</p>
        {privateNotes}
        {isPrivate}
        <ul className="connectionList" >
          <li><strong>Stories:</strong></li>
          {storiesContent}
        </ul>
        <ul className="connectionList" >
          <li><strong>Characters:</strong></li>
          {charactersContent}
        </ul>
        <ul className="connectionList" >
          <li><strong>Locations:</strong></li>
          {locationsContent}
        </ul>
        <ul className="connectionList" >
          <li><strong>Events:</strong></li>
          {eventsContent}
        </ul>
        {editButton}
      </div>
    )
  }

}

export default connect(mapStateToRedux)(WorldLayout);