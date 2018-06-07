import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl } from '@material-ui/core';
import { CREATE_PAGE_ACTIONS } from '../../redux/actions/createPageActions';

const mapStateToProps = (reduxState) => ({ storiesReducer: reduxState.stories, createReducer: reduxState.create });

class CreateStoriesReducer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      valueField: '',
    }
  }

  componentDidMount = () => {
    if (this.props.createReducer.story.id && this.state.valueField !== this.props.createReducer.story.id) {
      this.setState({
        valueField: this.props.createReducer.story.id,
      })
    }
  }

  componentDidUpdate = () => {
    if (this.props.createReducer.story.id && this.state.valueField !== this.props.createReducer.story.id) {
      this.setState({
        valueField: this.props.createReducer.story.id,
      })
    }
  }

  handleChange = (event) => {
    const payload = this.props.storiesReducer.storiesInWorld.filter(story => story.id === event.target.value)[0];
    const action = {
      type: CREATE_PAGE_ACTIONS.SET_CREATE_STORY,
      payload: payload,
    }
    this.props.dispatch(action);

  }

  render() {

    return (
      <FormControl>
        <InputLabel htmlFor='story-select'>Select Story</InputLabel>
        <Select
          style={{minWidth: "160px"}}
          value={this.state.valueField}
          onChange={this.handleChange}
          inputProps={{ name: 'story', id: 'story-select' }}>
          {this.props.storiesReducer.storiesInWorld.map(story => <MenuItem key={story.id} value={story.id}>{story.title}</MenuItem>)}
        </Select>
      </FormControl>
    )
  }
}

export default connect(mapStateToProps)(CreateStoriesReducer);