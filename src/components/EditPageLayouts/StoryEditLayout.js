import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STORY_ACTIONS } from '../../redux/actions/storyActions';
import { TextField, FormControl, InputLabel, Select, Button, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

const mapStateToRedux = (reduxState) => ({ 
  storyReducer: reduxState.stories,
  locationReducer: reduxState.locations,
  characterReducer: reduxState.characters,
  eventReducer: reduxState.events,
});

class StoryEditLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startingTitle: '',
      title: '',
      synopsis: '',
      img_url: '',
      genre_id: '',
      private_notes: '',
      world_id: '',
      related_locations: [],
      related_characters: [],
      related_events: [],
      is_private: '',
    }
  }

  componentWillMount = () => {
    this.props.dispatch({
      type: STORY_ACTIONS.GET_STORY_DETAILS,
      payload: this.props.match.params.id,
    })
    this.props.dispatch({
      type: STORY_ACTIONS.GET_STORY_GENRES,
    })
  }

  componentDidUpdate = () => {
    if (!this.props.storyReducer.isLoading && !this.props.storyReducer.storyDetails.id) {
      this.props.history.push('/home');
    }
    if (this.state.startingTitle !== this.props.storyReducer.storyDetails.title && !this.props.storyReducer.isLoading) {
      let details = { ...this.props.storyReducer.storyDetails };
      for (var key in details) {
        if (details[key] == null) {
          details[key] = '';
        }
      }

      let related_locations = details.locations.map(location => ({value: location.id, label: location.name}))
      let related_characters = details.characters.map(character => ({value: character.id, label: character.name}))
      let related_events = details.events.map(event => ({value: event.id, label: event.name}))
      
      this.setState({
        startingTitle: details.title,
        title: details.title,
        synopsis: details.synopsis,
        img_url: details.img_url,
        private_notes: details.private_notes,
        genre_id: details.genre_id,
        world_id: details.world_id,
        related_locations: related_locations,
        related_characters: related_characters,
        related_events: related_events,
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
      type: STORY_ACTIONS.SUBMIT_EDIT_STORY,
      payload: toSend,
      id: this.props.match.params.id,
    });
    this.props.history.push(`/view/story/${this.props.match.params.id}`);
  }

  deleteStory = () => {
    const toDelete = window.confirm('Are you sure you want to delete this Story? You can\'t undo this.')
    if (toDelete) {
      this.props.dispatch({
        type: STORY_ACTIONS.DELETE_STORY,
        payload: this.props.match.params.id,
      });
      this.props.history.push(`/home`);
    }
  }

  render() {
    const details = { ...this.props.storyReducer.storyDetails };
    const locationSelectOptions = this.props.locationReducer.locationsInWorld.map(location => ({value: location.id, label: location.name}));
    const characterSelectOptions = this.props.characterReducer.charactersInWorld.map(character => ({value: character.id, label: character.name}));
    const eventSelectOptions = this.props.eventReducer.eventsInWorld.map(event => ({value: event.id, label: event.name}));

    return (
      <div>
        <h3>Modifying Story: {details.title}</h3>
        <form>
          <TextField className="editFormStandard" label="Title" value={this.state.title} onChange={this.handleChange('title')} />
          <br />
          <div className="editFormGenre" >
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
          <TextField className="editFormWide" rows="6" multiline label="Synopsis" value={this.state.synopsis} onChange={this.handleChange('synopsis')} />
          {/* <TextField className="editFormStandard" label="Image URL" value={this.state.img_url} onChange={this.handleChange('img_url')} /> */}
          <TextField className="editFormWide" multiline rows="4" label="Private Notes" value={this.state.private_notes} onChange={this.handleChange('private_notes')} />

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
          <br />
          <Button variant="contained" id="confirmStoryEditsButton" color="primary" onClick={this.submitEdits}>Save Edits</Button>
          <Button variant="contained" id="deleteStoryButton" color="secondary" onClick={this.deleteStory}>Delete Story</Button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToRedux)(StoryEditLayout);