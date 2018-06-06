import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Typography, Button } from '@material-ui/core';
import { STORY_ACTIONS } from '../../redux/actions/storyActions';

const mapStateToProps = (reduxState) => ({storyReducer: reduxState.stories})

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
    this.props.dispatch({type: STORY_ACTIONS.GET_STORY_GENRES })
  }

  handleChange = (property) => (event) => {
    this.setState({
      [property]: event.target.value,
    })
  }

  submitStory = () => {
    let toSend = {...this.state};
    for (var key in toSend) {
      if (toSend[key] == '') {
        toSend[key] = null;
      }
    }
    let storiesWithName = this.props.storyReducer.storiesInWorld.filter(story => story.title === toSend.title);
    if (toSend.name !== null && storiesWithName.length === 0 ) {
      this.props.dispatch({ type: STORY_ACTIONS.SUBMIT_NEW_STORY, payload: toSend })
    } else {
      alert('New World must be named a unique name');
    }
  }

  render() {
    return (
      <div>
        <h3>New World</h3>
        <form>
          <TextField className="createFormName" label="Title" value={this.state.title} onChange={this.handleChange('name')} />
          <br />
          <br />
          <TextField className="createFormDescription" rows="6" multiline label="Description" value={this.state.synopsis} onChange={this.handleChange('description')} />
          <br />
          <br />
          <TextField className="createFormUrl" label="Image URL" value={this.state.img_url} onChange={this.handleChange('img_url')} />
          <br />
          <br />
          <TextField className="createFormNotes" multiline rows="4" label="Private Notes" value={this.state.private_notes} onChange={this.handleChange('private_notes')} />
          <br />
          <br />
          <Button variant="contained" className="createFormButton" color="primary" raised="raised" onClick={this.submitStory}>Create Story</Button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(StoryForm);