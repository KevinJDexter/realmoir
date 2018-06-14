import React, { Component } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { connect } from 'react-redux';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import { CHARACTER_ACTIONS } from '../../redux/actions/characterActions';

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
      world_id: 0,
      is_private: '',
    }
  }

  componentDidMount() {
    if (this.props.createReducer.story.id) {
      this.setState({
        related_stories: [{ value: this.props.createReducer.story.id, label: this.props.createReducer.story.title }]
      })
    }
    this.setState({
      world_id: this.props.createReducer.world.id,
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

  submitCharacter = () => {
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
      type: CHARACTER_ACTIONS.CREATE_NEW_CHARACTER,
      payload: toSend,
    });
    this.props.history.push('/home');
  }

  render() {

    let storySelectOptions = this.props.storyReducer.storiesInWorld.map(story => ({ value: story.id, label: story.title }));
    let locationSelectOptions = this.props.locationReducer.locationsInWorld.map(location => ({ value: location.id, label: location.name }));
    let characterSelectOptions = this.props.characterReducer.charactersInWorld.map(character => ({ value: character.id, label: character.name }));
    let eventSelectOptions = this.props.eventReducer.eventsInWorld.map(event => ({ value: event.id, label: event.name }));


    return (
      <div>
        <h3>New Character in {this.props.createReducer.world.name}</h3>
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
            placeholder="Stories this location appears in..."
          />
          <h5>Related Characters</h5>
          <ReactSelect
            className="createFormSelect"
            name="test"
            value={this.state.related_characters}
            multi={true}
            onChange={this.handleSelectChange('related_characters')}
            options={characterSelectOptions}
            placeholder="Characters contained in this story..."
          />
          <h5>Related Locations</h5>
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

          <Button variant="contained" className="createFormButton" color="primary" onClick={this.submitCharacter}>Create Character</Button>
        </form>
      </div>
        )
      }
    
    }
    
export default connect(mapStateToProps)(CharacterForm);