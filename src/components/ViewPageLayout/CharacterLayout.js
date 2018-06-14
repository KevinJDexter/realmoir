import React, {Component} from 'react';
import { CHARACTER_ACTIONS } from '../../redux/actions/characterActions';
import {connect} from 'react-redux';
import {Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const mapStateToProps = (reduxState) => ({
  characterReducer: reduxState.characters,
})

class CharacterLayout extends Component {

  componentWillMount = () => {
    this.props.dispatch({
      type: CHARACTER_ACTIONS.GET_CHARACTER_DETAILS,
      payload: this.props.match.params.id,
    })
  }

  componentDidUpdate = () => {
    if (!this.props.characterReducer.isLoading && !this.props.characterReducer.characterDetails.id) {
      this.props.history.push('/home');
    }
    if (this.props.match.params.id !== String(this.props.characterReducer.characterDetails.id)) {
      this.props.dispatch({
        type: CHARACTER_ACTIONS.GET_CHARACTER_DETAILS,
        payload: this.props.match.params.id,
      })
    }
  }

  editCharacter = () => {
    this.props.history.push(`/edit/character/${this.props.match.params.id}`)
  }

  render () {
    let details = {...this.props.characterReducer.characterDetails};

    for (let key in details) {
      if (details[key] === null && key !== 'home' && key !== 'home_id') {
        details[key] = 'N/A';
      }
    }

    let storiesContent = <li className="linkedElements" >None</li>
    if (details.stories.length > 0) {
      storiesContent = details.stories.map(story => <Link key={story.id} className="linkedElements" to={`/view/story/${story.id}`}>{story.title}</Link> )
    }

    let locationsContent = <li className="linkedElements" >None</li>
    if (details.locations.length > 0) {
      locationsContent = details.locations.map(location => <Link key={location.id} className="linkedElements" to={`/view/location/${location.id}`}>{location.name}</Link> )
    }

    let relationshipsContent = <li className="linkedElements" >None</li>
    if (details.relationships.length > 0) {
      relationshipsContent = details.relationships.map(character => <Link key={character.id} className="linkedElements" to={`/view/character/${character.id}`}>{character.name}</Link> )
    }

    let eventsContent = <li className="linkedElements" >None</li>
    if (details.events.length > 0) {
      eventsContent = details.events.map(event => <Link key={event.id} className="linkedElements" to={`/view/event/${event.id}`}>{event.name}</Link> )
    }

    let editButton, privateNotes, isPrivate;

    if (details.is_owner !== false) {
      let visibility = "Public";
      if (details.is_private) {
        visibility = "Private";
      }
      editButton = <Button onClick={this.editCharacter} variant="contained" color="primary" >Edit Character</Button>;
      privateNotes = <div><h4>Notes:</h4><p>{details.private_notes}</p></div>;
      isPrivate = <div><h4>Visibility:</h4><p>{visibility}</p></div>
    }

    let homeLink = <p>N/A</p>
    if (details.home !== null) {
      homeLink = <p><Link to={`/view/world/${details.home_id}`}>{details.home}</Link></p>
    }

    return (
      <div className="formContainer" >
        <h2>{details.name}</h2>
        <h4>Alias</h4>
        <p>{details.alias}</p>
        <h4>Description</h4>
        <p>{details.description}</p>
        <h4>Bio</h4>
        <p>{details.bio}</p>
        <h4>Lived</h4>
        <p>{details.birth_date}-{details.death_date}</p><p>Age: {details.age}</p>
        <h4>Appearance</h4>
        <p>Eyes: {details.eye_color}</p>
        <p>Hair: {details.hair_color}</p>
        <p>Skin: {details.skin_color}</p>
        <p>Height: {details.height}</p>
        <p>Gender: {details.gender}</p>
        <h4>Home</h4>
        {homeLink}
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
          {relationshipsContent}
        </ul>
        <ul className="connectionList" >
          <li><strong>Locations Visited:</strong></li>
          {locationsContent}
        </ul>
        <ul className="connectionList" >
          <li><strong>Events Visited:</strong></li>
          {eventsContent}
        </ul>
        {editButton}
      </div>
    )
  }
}

export default connect(mapStateToProps)(CharacterLayout);