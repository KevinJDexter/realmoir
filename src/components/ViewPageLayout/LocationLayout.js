import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { LOCATION_ACTIONS } from '../../redux/actions/locationActions';
import Moment from 'react-moment';

const mapStateToProps = (reduxState) => ({
  locationReducer: reduxState.locations,
})

class LocationLayout extends Component {

  componentWillMount = () => {
    this.props.dispatch({
      type: LOCATION_ACTIONS.GET_LOCATION_DETAILS,
      payload: this.props.match.params.id,
    });
  }

  componentDidUpdate = () => {
    if (!this.props.locationReducer.isLoading && !this.props.locationReducer.locationDetails.id) {
      this.props.history.push('/home');
    }
    if (this.props.match.params.id !== String(this.props.locationReducer.locationDetails.id)) {
      this.props.dispatch({
        type: LOCATION_ACTIONS.GET_LOCATION_DETAILS,
        payload: this.props.match.params.id,
      })
    }
  }

  componentWillUnmount = () => {
    this.props.dispatch({
      type: LOCATION_ACTIONS.CLEAR_LOCATION_DETAILS,
    })
  }

  editLocation = () => {
    this.props.history.push(`/edit/location/${this.props.match.params.id}`);
  }

  render() {
    let details = { ...this.props.locationReducer.locationDetails };
    let neighbors = details.neighbors.filter(location => location.contained === false && location.parent === false);
    let contained_locations = details.neighbors.filter(location => location.contained === true);
    let parent_locations = details.neighbors.filter(location => location.parent === true);

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

    let homeToContent;
    if (details.homeTo.length > 0) {
      homeToContent = <ul className="connectionList">
        <li><strong>Home To:</strong></li>
        {details.homeTo.map(character => <Link className="linkedElements" key={character.id} to={`/view/character/${character.id}`} >{character.name}</Link>)}
      </ul>
    }

    let neighboringLocationsContent = <li className="linkedElements">None</li>
    if (neighbors.length > 0) {
      neighboringLocationsContent = neighbors.map(location => <Link className="linkedElements" key={location.id} to={`/view/location/${location.id}`} >{location.name}</Link>)
    }

    let containedLocationsContent;
    if (contained_locations.length > 0) {
      containedLocationsContent = <ul className="connectionList">
        <li><strong>Contains Locations:</strong></li>
        {contained_locations.map(location => <Link className="linkedElements" key={location.id} to={`/view/location/${location.id}`} >{location.name}</Link>)}
      </ul>
    }

    let containedByLocationsContent;
    if (parent_locations.length > 0) {
      containedByLocationsContent = <ul className="connectionList">
        <li><strong>Contained By Locations:</strong></li>
        {parent_locations.map(location => <Link className="linkedElements" key={location.id} to={`/view/location/${location.id}`} >{location.name}</Link>)}
      </ul>
    }

    let eventsContent = <li className="linkedElements">None</li>
    if (details.events.length > 0) {
      eventsContent = details.events.map(event => <Link className="linkedElements" key={event.id} to={`/view/event/${event.id}`} >{event.name}</Link>)
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
      editButton = <Button onClick={this.editLocation} variant="contained" color="primary" > Edit Location</Button>;
      privateNotes = <div><h4>Notes:</h4><p>{details.private_notes}</p></div>;
      isPrivate = <div>
        <p><strong>Visibility:</strong> {visibility}</p>
        <p><strong>User setting:</strong> {userPrivate} - <strong>World setting:</strong> {worldPrivate} - <strong>Location Setting:</strong> {itemPrivate}</p>
      </div>
    }


    return (
      <div>
        <div className="formContainer" >
          <h2>{details.name}</h2>
          <h4>Description</h4>
          <p>{details.description}</p>
          <h4>History</h4>
          <p>{details.history}</p>
          <h4>Climate</h4>
          <p>{details.climate}</p>
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
          {homeToContent}
          <ul className="connectionList" >
            <li><strong>Neighboring Locations:</strong></li>
            {neighboringLocationsContent}
          </ul>
          {containedLocationsContent}
          {containedByLocationsContent}
          <ul className="connectionList" >
            <li><strong>Events:</strong></li>
            {eventsContent}
          </ul>
          {editButton}
        </div>
        <p className="dateWatermark">Date Created: <Moment format="ddd MMM Do, YYYY HH:mm:ss">{details.date_created}</Moment></p>
        <p className="dateWatermark">Last Updated: <Moment format="ddd MMM Do, YYYY HH:mm:ss">{details.last_updated}</Moment></p>
      </div>
    )
  }
}

export default connect(mapStateToProps)(LocationLayout);