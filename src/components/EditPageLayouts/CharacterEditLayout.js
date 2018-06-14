import React, { Component } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { connect } from 'react-redux';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import { CHARACTER_ACTIONS } from '../../redux/actions/characterActions';
import { STORY_ACTIONS } from '../../redux/actions/storyActions';

const mapStateToProps = (reduxState) => ({
  createReducer: reduxState.create,
  storyReducer: reduxState.stories,
  locationReducer: reduxState.locations,
  characterReducer: reduxState.characters,
  eventReducer: reduxState.events,
})

class CharacterForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startingName: '',
      name: '',
      description: '',
      bio: '',
      alias: '',
      death_date: '',
      birth_date: '',
      age: '',
      eye_color: '',
      hair_color: '',
      skin_color: '',
      gender: '',
      height: '',
      img_url: '',
      private_notes: '',
      home_id: '',
      related_stories: [],
      related_characters: [],
      related_locations: [],
      related_events: [],
      world_id: 0,
      is_private: '',
    }
  }
  
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
    if (this.state.startingName !== this.props.characterReducer.characterDetails.name && !this.props.characterReducer.isLoading) {
      let details = { ...this.props.characterReducer.characterDetails };
      for (var key in details) {
        if (details[key] == null) {
          details[key] = '';
        }
      }

      let related_stories = details.stories.map(story => ({value: story.id, label: story.title}))
      let related_characters = details.relationships.map(character => ({value: character.id, label: character.name, relationship: character.relationship}))
      let related_locations = details.locations.map(location => ({value: location.id, label: location.name}))
      let related_events = details.events.map(event => ({value: event.id, label: event.name}))

      this.setState({
        startingName: details.name,
        name: details.name,
        description: details.description,
        bio: details.bio,
        alias: details.alias,
        death_date: details.death_date,
        birth_date: details.birth_date,
        age: details.age,
        eye_color: details.eye_color,
        hair_color: details.hair_color,
        sking_color: details.skin_color,
        gender: details.gender,
        height: details.height,
        img_url: details.img_url,
        private_notes: details.private_notes,
        world_id: details.world_id,
        home_id: details.home_id,
        related_stories: related_stories,
        related_characters: related_characters,
        related_locations: related_locations,
        related_events: related_events,
        is_private: String(details.is_private),
      })

      this.props.dispatch({
        type: STORY_ACTIONS.GET_STORIES_IN_WORLD,
        payload: details.world_id,
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

  editCharacter = () => {
    let toSend = {...this.state};
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
    this.props.dispatch ({
      type: CHARACTER_ACTIONS.SUBMIT_EDIT_CHARACTER,
      payload: toSend,
      id: this.props.match.params.id,
    })
    this.props.history.push(`/view/character/${this.props.match.params.id}`);
  }

  deleteCharacter = () => {
    const toDelete = window.confirm('Are you sure you want to delete this Character? You can\'t undo this.')
    if (toDelete) {
      this.props.dispatch({
        type: CHARACTER_ACTIONS.DELETE_CHARACTER,
        payload: this.props.match.params.id,
      })
      this.props.history.push('/home');
    }
  }

  render() {

    let storySelectOptions = this.props.storyReducer.storiesInWorld.map(story => ({ value: story.id, label: story.title }));
    let locationSelectOptions = this.props.locationReducer.locationsInWorld.map(location => ({ value: location.id, label: location.name }));
    let characterSelectOptions = this.props.characterReducer.charactersInWorld.map(character => ({ value: character.id, label: character.name }));
    let eventSelectOptions = this.props.eventReducer.eventsInWorld.map(event => ({ value: event.id, label: event.name }));


    return (
      <div>
        <h3>Modifying {this.state.startingName}</h3>
        <form>
          <TextField className="createFormStandard" label="Name" value={this.state.name} onChange={this.handleChange('name')} />
          <TextField className="createFormStandard" label="Alias" value={this.state.alias} onChange={this.handleChange('alias')} />
          <TextField className="createFormWide" rows="6" multiline label="Description" value={this.state.description} onChange={this.handleChange('description')} />
          <TextField className="createFormWide" rows="6" multiline label="History" value={this.state.history} onChange={this.handleChange('bio')} />
          <div>
          <TextField className="createFormSmall" label="Born" value={this.state.birth_date} onChange={this.handleChange('birth_date')} />
          <TextField className="createFormSmall" label="Death" value={this.state.death_date} onChange={this.handleChange('death_date')} />
          <TextField type="number" className="createFormSmall" label="Age" value={this.state.age} onChange={this.handleChange('age')} />
          </div>
          <div>
          <TextField className="createFormSmall" label="Eyes" value={this.state.eye_color} onChange={this.handleChange('eye_color')} />
          <TextField className="createFormSmall" label="Hair" value={this.state.hair_color} onChange={this.handleChange('hair_color')} />
          <TextField className="createFormSmall" label="Skin" value={this.state.skin_color} onChange={this.handleChange('skin_color')} />
          </div>
          <div>
          <TextField className="createFormSmall" label="Height" value={this.state.height} onChange={this.handleChange('height')} />
          <TextField className="createFormSmall" label="Gender" value={this.state.gender} onChange={this.handleChange('gender')} />
          </div>
          <br />
          <div className="createFormHome">
            <FormControl>
              <InputLabel htmlFor='home-select'>Select Home</InputLabel>
              <Select
                style={{ minWidth: "160px" }}
                value={this.state.home_id}
                onChange={this.handleChange('home_id')}
                inputProps={{ name: 'home', id: 'home-select' }}>
                {this.props.locationReducer.locationsInWorld.map(location => <MenuItem key={location.id} value={location.id}>{location.name}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
          <br />
          <TextField className="createFormStandard" label="Image URL" value={this.state.img_url} onChange={this.handleChange('img_url')} />
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
          
          <h5>Related Stories</h5>
          <ReactSelect
            className="createFormSelect"
            name="test"
            value={this.state.related_stories}
            multi={true}
            onChange={this.handleSelectChange('related_stories')}
            options={storySelectOptions}
            placeholder="Stories this character appears in..."
          />
          <h5>Related Characters</h5>
          <ReactSelect
            className="createFormSelect"
            name="test"
            value={this.state.related_characters}
            multi={true}
            onChange={this.handleSelectChange('related_characters')}
            options={characterSelectOptions}
            placeholder="Characters this character has met..."
          />
          <h5>Related Locations</h5>
          <ReactSelect
            className="createFormSelect"
            name="test"
            value={this.state.related_locations}
            multi={true}
            onChange={this.handleSelectChange('related_locations')}
            options={locationSelectOptions}
            placeholder="Locations this character has visited..."
          />
          <h5>Related Events</h5>
          <ReactSelect
            className="createFormSelect"
            name="test"
            value={this.state.related_events}
            multi={true}
            onChange={this.handleSelectChange('related_events')}
            options={eventSelectOptions}
            placeholder="Events related to this character..."
          />  

          <Button variant="contained" id="confirmCharacterEditsButton" color="primary" onClick={this.editCharacter}>Save Edits</Button>
          <Button variant="contained" id="deleteCharacterButton" color="secondary" onClick={this.deleteCharacter}>Delete Character</Button>

        </form>
      </div>
        )
      }
    
    }
    
export default connect(mapStateToProps)(CharacterForm);