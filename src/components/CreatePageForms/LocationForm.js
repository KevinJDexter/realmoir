import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import { LOCATION_ACTIONS } from '../../redux/actions/locationActions';

const mapStateToProps = (reduxState) => ({
  createReducer: reduxState.create,
  storyReducer: reduxState.stories,
})

class LocationForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      history: '',
      climate: '',
      img_url: '',
      private_notes: '',
      related_stories: [],
      world_id: 0,
    }
  }

  componentDidMount() {
    if (this.props.createReducer.story.id) {
      this.setState({
        related_stories: [{value: this.props.createReducer.story.id, label: this.props.createReducer.story.title}]
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

  submitLocation = () => {
    this.props.dispatch({
      type: LOCATION_ACTIONS.CREATE_NEW_LOCATION,
      payload: this.state,
    });
    this.props.history.push('/home');
  }

  render() {

    let storySelectOptions = this.props.storyReducer.storiesInWorld.map(story => ({value: story.id, label: story.title}));

    return (
      <div>
        <h3>New Location in {this.props.createReducer.world.name}</h3>
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
          <Button variant="contained" className="createFormButton" color="primary" onClick={this.submitLocation}>Create Location</Button>

        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(LocationForm);