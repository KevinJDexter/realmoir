import React, {Component} from 'react';
import {connect} from 'react-redux';
import { STORY_ACTIONS } from '../../redux/actions/storyActions';
import { TextField, FormControl, InputLabel, Select, Button, MenuItem } from '@material-ui/core';

const mapStateToRedux = (reduxState) => ({storyReducer: reduxState.stories});

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
      console.log(details);
      this.setState({
        startingTitle: details.title,
        title: details.title,
        synopsis: details.synopsis,
        img_url: details.img_url,
        private_notes: details.private_notes,
        genre_id: details.genre_id,
        world_id: details.world_id,
      })
    }
  }

  handleChange = (property) => (event) => {
    this.setState({
      [property]: event.target.value,
    })
  }

  submitEdits = () => {
    this.props.dispatch({
      type: STORY_ACTIONS.SUBMIT_EDIT_STORY,
      payload: this.state,
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

    return (
     <div>
        <h3>Modifying Story: {details.title}</h3>
        <form>
          <TextField className="editFormName" label="Title" value={this.state.title} onChange={this.handleChange('title')} />
          <br />
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
          <br />
          <TextField className="editFormDescription" rows="6" multiline label="Synopsis" value={this.state.synopsis} onChange={this.handleChange('synopsis')} />
          <br />
          <br />
          <TextField className="editFormUrl" label="Image URL" value={this.state.img_url} onChange={this.handleChange('img_url')} />
          <br />
          <br />
          <TextField className="editFormNotes" multiline rows="4" label="Private Notes" value={this.state.private_notes} onChange={this.handleChange('private_notes')} />
          <br />
          <br />
          <Button variant="contained" id="confirmStoryEditsButton" color="primary" onClick={this.submitEdits}>Save Edits</Button>
          <Button variant="contained" id="deleteStoryButton" color="secondary" onClick={this.deleteStory}>Delete Story</Button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToRedux)(StoryEditLayout);