import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';
import { Button } from '@material-ui/core';

const mapStateToRedux = (reduxState) => ({ worldReducer: reduxState.worlds })

class WorldLayout extends Component {

  componentWillMount = () => {
    this.props.dispatch({
      type: WORLD_ACTIONS.GET_WORLD_DETAILS,
      payload: this.props.match.params.id,
    })
  }

  componentDidUpdate = () => {
    if (this.props.match.params.id != this.props.worldReducer.worldDetails.id) {
      this.props.dispatch({
        type: WORLD_ACTIONS.GET_WORLD_DETAILS,
        payload: this.props.match.params.id,
      })
    }
  }

  editWorld = () => {
    this.props.history.push(`/edit/world/${this.props.match.params.id}`)
  }

  render() {
    const details = { ...this.props.worldReducer.worldDetails };

    let descriptionContent = details.description
    if (details.description == null) {
      descriptionContent = "None"
    }

    let storiesContent = details.stories.map(story => <li key={story.id}><Link className="linkedStories" to={`/view/story/${story.id}`}>{story.title}</Link></li>)
    if (details.stories.length === 0) {
      storiesContent = <li className="linkedStories">None</li>
    } 

    let editButton = <Button onClick={this.editWorld} variant="contained" color="primary" >Edit World</Button>;
    let privateNotes = <div><h4>Notes:</h4><p>{details.private_notes}</p></div>;

    if (details.is_owner === false) {
      editButton = <div></div>
      privateNotes = <div></div>
    }

    return (
      <div className="formContainer" >
        <h2>{details.name}</h2>
        <h4>Description</h4>
        <p>{descriptionContent}</p>
        <ul className="worldStoriesList" >
          <li><strong>Stories:</strong></li>
          {storiesContent}
        </ul>
        {privateNotes}
        {editButton}
      </div>
    )
  }

}

export default connect(mapStateToRedux)(WorldLayout);