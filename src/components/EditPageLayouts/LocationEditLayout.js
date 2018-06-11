import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import { LOCATION_ACTIONS } from '../../redux/actions/locationActions';
import { STORY_ACTIONS } from '../../redux/actions/storyActions';

const mapStateToProps = (reduxState) => ({
  createReducer: reduxState.create,
  storyReducer: reduxState.stories,
  locationReducer: reduxState.locations,
  characterReducer: reduxState.characters,
})

class LocationEditLayout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startingName: '',
      name: '',
      description: '',
      history: '',
      climate: '',
      img_url: '',
      private_notes: '',
      related_stories: [],
      related_characters: [],
      neighboring_locations: [],
      contained_locations: [],
      contained_by_locations: [],
      world_id: '',
    }
  }

  componentWillMount = () => {
    this.props.dispatch({
      type: LOCATION_ACTIONS.GET_LOCATION_DETAILS,
      payload: this.props.match.params.id,
    })
  }

  componentDidUpdate = () => {
    if (!this.props.locationReducer.isLoading && !this.props.locationReducer.locationDetails.id) {
      this.props.history.push('/home');
    }
    if (this.state.startingName !== this.props.locationReducer.locationDetails.name && !this.props.locationReducer.isLoading) {
      let details = { ...this.props.locationReducer.locationDetails };
      for (var key in details) {
        if (details[key] == null) {
          details[key] = '';
        }
      }

      let related_stories = details.stories.map(story => ({value: story.id, label: story.title}))
      let related_characters = details.characters.map(character => ({value: character.id, label: character.name}))
      let neighboring_locations = details.neighbors.filter(location => location.contained === false && location.parent === false).map(location => ({value: location.id, label: location.name}))
      let contained_locations = details.neighbors.filter(location => location.contained === true ).map(location => ({value: location.id, label: location.name}))
      let contained_by_locations = details.neighbors.filter(location => location.parent === true ).map(location => ({value: location.id, label: location.name}))

      this.setState({
        startingName: details.name,
        name: details.name,
        description: details.description,
        history: details.history,
        climate: details.climate,
        img_url: details.img_url,
        private_notes: details.private_notes,
        world_id: details.world_id,
        related_stories: related_stories,
        related_characters: related_characters,
        neighboring_locations: neighboring_locations,
        contained_locations: contained_locations,
        contained_by_locations, contained_by_locations,
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

  editLocation = () => {
    let toSend = {...this.state};
    for (var key in toSend) {
      if (toSend[key] === '') {
        toSend[key] = null;
      }
    }
    this.props.dispatch ({
      type: LOCATION_ACTIONS.SUBMIT_EDIT_LOCATION,
      payload: toSend,
      id: this.props.match.params.id,
    })
    this.props.history.push(`/view/location/${this.props.match.params.id}`);
  }

  deleteLocation = () => {
    const toDelete = window.confirm('Are you sure you want to delete this Location? You can\'t undo this.')
    if (toDelete) {
      this.props.dispatch({
        type: LOCATION_ACTIONS.DELETE_LOCATION,
        payload: this.props.match.params.id,
      })
      this.props.history.push('/home');
    }
  }

  render () {
   
    let storySelectOptions = this.props.storyReducer.storiesInWorld.map(story => ({value: story.id, label: story.title}));
    let characterSelectOptions = this.props.characterReducer.charactersInWorld.map(character => ({value: character.id, label: character.name}));
    let locationSelectOptions = this.props.locationReducer.locationsInWorld.map(location => ({value: location.id, label: location.name}));
    let containsLocationsOptions = this.props.locationReducer.locationsInWorld.map(location => ({value: location.id, label: location.name})); 
    let containedByLocationsOptions = this.props.locationReducer.locationsInWorld.map(location => ({value: location.id, label: location.name})); 

    return (
      <div>
        <h3>Modifying {this.state.startingName}</h3>
        <form>
          <TextField className="createFormStandard" label="Name" value={this.state.name} onChange={this.handleChange('name')} />
          <TextField className="createFormWide" rows="6" multiline label="Description" value={this.state.description} onChange={this.handleChange('description')} />
          <TextField className="createFormWide" rows="6" multiline label="History" value={this.state.history} onChange={this.handleChange('history')} />
          <TextField className="createFormStandard" label="climate" value={this.state.climate} onChange={this.handleChange('climate')} />
          <TextField className="createFormStandard" label="Image URL" value={this.state.img_url} onChange={this.handleChange('img_url')} />
          <TextField className="createFormWide" multiline rows="4" label="Private Notes" value={this.state.private_notes} onChange={this.handleChange('private_notes')} />
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
            placeholder="Characters that have interacted with this location..."
          />
          <h5>Neighboring Locations</h5>
          <ReactSelect
            className="createFormSelect"
            name="test"
            value={this.state.neighboring_locations}
            multi={true}
            onChange={this.handleSelectChange('neighboring_locations')}
            options={locationSelectOptions}
            placeholder="Other locations neighboring this one..."
          />
          <h5>Contains Locations</h5>
          <ReactSelect
            className="createFormSelect"
            name="test"
            value={this.state.contained_locations}
            multi={true}
            onChange={this.handleSelectChange('contained_locations')}
            options={containsLocationsOptions}
            placeholder="Locations located withing this one..."
          />
          <h5>Contained Within Locations</h5>
          <ReactSelect
            className="createFormSelect"
            name="test"
            value={this.state.contained_by_locations}
            multi={true}
            onChange={this.handleSelectChange('contained_by_locations')}
            options={containedByLocationsOptions}
            placeholder="Locations this area is located within..."
          />
          <Button variant="contained" id="confirmLocationEditsButton" color="primary" onClick={this.editLocation}>Save Edits</Button>
          <Button variant="contained" id="deleteLocationButton" color="secondary" onClick={this.deleteLocation}>Delete Location</Button>

        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(LocationEditLayout);
