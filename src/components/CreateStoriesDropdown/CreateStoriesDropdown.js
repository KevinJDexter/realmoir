import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { BROWSE_ACTIONS } from '../../redux/actions/browseActions';
import { FormControl } from '@material-ui/core';

const mapStateToProps = (reduxState) => ({ browseReducer: reduxState.browse, storiesReducer: reduxState.stories });

class CreateStoriesReducer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      valueField: '',
    }
  }

  componentDidUpdate = () => {
    if (this.props.browseReducer.browse.story.id && this.state.valueField !== this.props.browseReducer.browse.story.id) {
      this.setState({
        valueField: this.props.browseReducer.browse.story.id,
      })
    }
  }

  handleChange = (event) => {
    const payload = this.props.storiesReducer.stories.filter(story => story.id === event.target.value)[0];
    const action = {
      type: 'SET_BROWSE_STORY',
      payload: payload,
    }
    this.props.dispatch(action);

  }

  render() {

    return (
      <FormControl>
        <InputLabel htmlFor='story-select'>Story</InputLabel>
        <Select
          style={{minWidth: "160px"}}
          value={this.state.valueField}
          onChange={this.handleChange}
          inputProps={{ name: 'story', id: 'story-select' }}>
          {this.props.storiesReducer.stories.map(story => <MenuItem key={story.id} value={story.id}>{story.title}</MenuItem>)}
        </Select>
      </FormControl>
    )
  }
}

export default connect(mapStateToProps)(CreateStoriesReducer);