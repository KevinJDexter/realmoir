import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Select, FormControl, MenuItem, InputLabel, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { STORY_ACTIONS } from '../../redux/actions/storyActions';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

const mapStateToProps = (reduxState) => ({
  storyReducer: reduxState.stories,
  createReducer: reduxState.create,
  locationReducer: reduxState.locations,
  characterReducer: reduxState.characters,
  eventReducer: reduxState.events,
})

class StoryForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      synopsis: '',
      genre_id: '',
      img_url: '',
      private_notes: '',
      related_locations: [],
      related_characters: [],
      related_events: [],
      is_private: 'false',
    }
  }

  componentDidMount = () => {
    this.props.dispatch({ type: STORY_ACTIONS.GET_STORY_GENRES })
  }

  componentWillUnmount = () => {
    this.props.dispatch({ 
      type: STORY_ACTIONS.CLEAR_STORY_DETAILS,
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

  submitStory = () => {
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
    let storiesWithName = this.props.storyReducer.storiesInWorld.filter(story => story.title === toSend.title);
    if (toSend.title !== null && toSend.synopsis !== null && storiesWithName.length === 0) {
      this.props.dispatch({ type: STORY_ACTIONS.SUBMIT_NEW_STORY, payload: toSend });
      this.props.history.push('/home');
    } else {
      alert('New Story must be named a unique name and have a synopsis');
    }
  }

  render() {

    let locationSelectOptions = this.props.locationReducer.locationsInWorld.map(location => ({ value: location.id, label: location.name }));
    let characterSelectOptions = this.props.characterReducer.charactersInWorld.map(character => ({ value: character.id, label: character.name }));
    let eventSelectOptions = this.props.eventReducer.eventsInWorld.map(event => ({ value: event.id, label: event.name }));

    return (
      <div>
        <h3>New Story in {this.props.createReducer.world.name}</h3>
        <form>
          <TextField className="createFormStandard" label="Title" value={this.state.title} onChange={this.handleChange('title')} />
          <br />
          <div className="createFormGenre">
            <FormControl>
              <InputLabel htmlFor='genre-select'>Select Genre</InputLabel>
              <Select
                style={{ minWidth: "160px" }}
                value={this.state.genre_id}
                onChange={this.handleChange('genre_id')}
                inputProps={{ name: 'genre', id: 'genre-select' }}>
                {this.props.storyReducer.genres.map(genre => <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
          <br />
          <TextField className="createFormWide" rows="6" multiline label="Synopsis" value={this.state.synopsis} onChange={this.handleChange('synopsis')} />
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
            placeholder="Characters contained in this story..."
          />
          <h5>Contains Locations</h5>
          <ReactSelect
            className="createFormSelect"
            name="test"
            value={this.state.related_locations}
            multi={true}
            onChange={this.handleSelectChange('related_locations')}
            options={locationSelectOptions}
            placeholder="Locations contained in this story..."
          />
          <h5>Contains Events</h5>
          <ReactSelect
            className="createFormSelect"
            name="test"
            value={this.state.related_events}
            multi={true}
            onChange={this.handleSelectChange('related_events')}
            options={eventSelectOptions}
            placeholder="Events contained in this story..."
          />
          <Button variant="contained" className="createFormButton" color="primary" onClick={this.submitStory}>Create Story</Button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(StoryForm);