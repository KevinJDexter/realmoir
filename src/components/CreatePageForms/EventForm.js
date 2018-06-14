import React, { Component } from 'react';
import { connect} from 'react-redux';
import { TextField, Button, Select, FormControl, MenuItem, InputLabel, FormLabel, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { EVENT_ACTIONS } from '../../redux/actions/eventActions';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

const mapStateToProps = (reduxState) => ({
  storyReducer: reduxState.stories,
  createReducer: reduxState.create,
  locationReducer: reduxState.locations,
  characterReducer: reduxState.characters,
  eventReducer: reduxState.events,
})

class EventForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      location: '',
      date_of_event: '',
      img_url: '',
      private_notes: '',
      related_characters: [],
      related_stories: [],
      is_private: 'false',
    }
  }

 componentDidMount() {
    if (this.props.createReducer.story.id) {
      this.setState({
        related_stories: [{value: this.props.createReducer.story.id, label: this.props.createReducer.story.title}]
      })
    } 
  } 

  componentWillUnmount = () => {
    this.props.dispatch({ 
      type: EVENT_ACTIONS.CLEAR_EVENT_DETAILS,
    })
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

  submitEvent = () => {
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
    toSend.world_id = this.props.createReducer.world.id;
    this.props.dispatch({ type: EVENT_ACTIONS.CREATE_NEW_EVENT, payload: toSend });
    this.props.history.push('/home');
  }
  render() {

    let characterSelectOptions = this.props.characterReducer.charactersInWorld.map(character => ({ value: character.id, label: character.name }));
    let storySelectOptions = this.props.storyReducer.storiesInWorld.map(story => ({ value: story.id, label: story.title }));

    return (
      <div>
        <h3>New Event in {this.props.createReducer.world.name}</h3>
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
          <Button variant="contained" className="createFormButton" color="primary" onClick={this.submitEvent}>Create Event</Button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(EventForm);