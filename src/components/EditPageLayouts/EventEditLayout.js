import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EVENT_ACTIONS } from '../../redux/actions/eventActions';
import { TextField, FormControl, InputLabel, Select, Button, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

const mapStateToProps = (reduxState) => ({
  storyReducer: reduxState.stories,
  locationReducer: reduxState.locations,
  characterReducer: reduxState.characters,
  eventReducer: reduxState.events,
});

class EventEditLayout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startingName: '',
      name: '',
      description: '',
      date_of_event: '',
      location: '',
      img_url: '',
      private_notes: '',
      world_id: '',
      related_characters: [],
      related_stories: [],
      is_private: '',
    }
  }

  componentWillMount = () => {
    this.props.dispatch({
      type: EVENT_ACTIONS.GET_EVENT_DETAILS,
      payload: this.props.match.params.id,
    })
  }

  componentDidUpdate = () => {
    if (!this.props.eventReducer.isLoading && !this.props.eventReducer.eventDetails.id) {
      this.props.history.push('/home');
    }
    if (this.state.startingName !== this.props.eventReducer.eventDetails.name && !this.props.eventReducer.isLoading) {
      let details = { ...this.props.eventReducer.eventDetails };
      for (var key in details) {
        if (details[key] == null) {
          details[key] = '';
        }
      }

      let related_characters = details.characters.map(character => ({ value: character.id, label: character.name }))
      let related_stories = details.stories.map(story => ({ value: story.id, label: story.title }))

      this.setState({
        startingName: details.name,
        name: details.name,
        description: details.description,
        date_of_event: details.date_of_event,
        img_url: details.img_url,
        private_notes: details.private_notes,
        location: details.location_id,
        world_id: details.world_id,
        related_characters: related_characters,
        related_stories: related_stories,
        is_private: String(details.is_private),
      })
    }
  }

  handleChange = (property) => (event) => {
    this.setState({
      [property]: event.target.value,
    })
  }

  handleSelectChange = (property) => (event) => {
    this.setState({
      [property]: event,
    })
  }

  submitEdits = () => {
    let toSend = { ...this.state };
    for (var key in toSend) {
      if (toSend[key] === '') {
        toSend[key] = null;
      }
    }
    if (toSend.is_private === 'false') {
      toSend.is_private = false;
    } else {
      toSend.is_private = true;
    }
    this.props.dispatch({
      type: EVENT_ACTIONS.SUBMIT_EDIT_EVENT,
      payload: toSend,
      id: this.props.match.params.id,
    });
    this.props.history.push(`/view/event/${this.props.match.params.id}`);
  }

  deleteEvent = () => {
    const toDelete = window.confirm('Are you sure you want to delete this Story? You can\'t undo this.')
    if (toDelete) {
      this.props.dispatch({
        type: EVENT_ACTIONS.DELETE_EVENT,
        payload: this.props.match.params.id,
      });
      this.props.history.push(`/home`);
    }
  }

  render() {

    let characterSelectOptions = this.props.characterReducer.charactersInWorld.map(character => ({ value: character.id, label: character.name }));
    let storySelectOptions = this.props.storyReducer.storiesInWorld.map(story => ({ value: story.id, label: story.title }));

    return (
      <div>
        <h3>Modifying {this.state.startingName}</h3>
        <form>
          <TextField className="createFormStandard" label="Name" value={this.state.name} onChange={this.handleChange('name')} />
          <TextField className="createFormWide" rows="6" multiline label="Description" value={this.state.description} onChange={this.handleChange('description')} />
          <br />
          <div className="createFormGenre">
            <FormControl>
              <InputLabel htmlFor='location-select'>Select Location</InputLabel>
              <Select
                style={{ minWidth: "160px" }}
                value={this.state.location}
                onChange={this.handleChange('location')}
                inputProps={{ name: 'location', id: 'location-select' }}>
                {this.props.locationReducer.locationsInWorld.map(location => <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
          <br />
          <TextField className="createFormStandard" label="Date of Event" value={this.state.date_of_event} onChange={this.handleChange('date_of_event')} />
          {/* <TextField className="createFormStandard" label="Image URL" value={this.state.img_url} onChange={this.handleChange('img_url')} /> */}
          <TextField className="createFormWide" multiline rows="4" label="Private Notes" value={this.state.private_notes} onChange={this.handleChange('private_notes')} />

          <br />
          <FormControl >
            <FormLabel >Visibility:</FormLabel>
            <RadioGroup
              name="is_private"
              value={this.state.is_private}
              onChange={this.handleChange('is_private')}
            >
              <FormControlLabel value="false" control={<Radio />} label="Public" />
              <FormControlLabel value="true" control={<Radio />} label="Private" />
            </ RadioGroup>
          </FormControl>
          <br />

          <h5>Contains Characters</h5>
          <ReactSelect
            className="createFormSelect"
            name="test"
            value={this.state.related_characters}
            multi={true}
            onChange={this.handleSelectChange('related_characters')}
            options={characterSelectOptions}
            placeholder="Characters present during this event..."
          />
          <h5>Contains Stories</h5>
          <ReactSelect
            className="createFormSelect"
            name="test"
            value={this.state.related_stories}
            multi={true}
            onChange={this.handleSelectChange('related_stories')}
            options={storySelectOptions}
            placeholder="Stories this event appears in..."
          />
          <Button variant="contained" id="confirmEventEditsButton" color="primary" onClick={this.submitEdits}>Save Edits</Button>
          <Button variant="contained" id="deleteEventButton" color="secondary" onClick={this.deleteEvent}>Delete Event</Button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(EventEditLayout);