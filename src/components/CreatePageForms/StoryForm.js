import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button, Select, FormControl, MenuItem, InputLabel } from '@material-ui/core';
import { STORY_ACTIONS } from '../../redux/actions/storyActions';

const mapStateToProps = (reduxState) => ({ storyReducer: reduxState.stories, createReducer: reduxState.create })

class StoryForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      synopsis: '',
      genre_id: '',
      img_url: '',
      private_notes: '',
    }
  }

  componentDidMount = () => {
    this.props.dispatch({ type: STORY_ACTIONS.GET_STORY_GENRES })
  }

  handleChange = (property) => (event) => {
    this.setState({
      [property]: event.target.value,
    })
  }

  submitStory = () => {
    let toSend = { ...this.state };
    for (var key in toSend) {
      if (toSend[key] === '') {
        toSend[key] = null;
      }
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
    return (
      <div>
        <h3>New Story in {this.props.createReducer.world.name}</h3>
        <form>
          <TextField className="createFormName" label="Title" value={this.state.title} onChange={this.handleChange('title')} />
          <br />
          <br />
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
          <br />
          <br />
          <TextField className="createFormDescription" rows="6" multiline label="Synopsis" value={this.state.synopsis} onChange={this.handleChange('synopsis')} />
          <br />
          <br />
          <TextField className="createFormUrl" label="Image URL" value={this.state.img_url} onChange={this.handleChange('img_url')} />
          <br />
          <br />
          <TextField className="createFormNotes" multiline rows="4" label="Private Notes" value={this.state.private_notes} onChange={this.handleChange('private_notes')} />
          <br />
          <br />
          <Button variant="contained" className="createFormButton" color="primary" onClick={this.submitStory}>Create Story</Button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(StoryForm);