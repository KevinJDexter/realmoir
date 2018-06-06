import React, { Component } from 'react';
import { connect } from 'react-redux';
import { STORY_ACTIONS } from '../../redux/actions/storyActions';
import { Link } from 'react-router-dom';

const mapStateToRedux = (reduxState) => ({ storyReducer: reduxState.stories })

class StoryLayout extends Component {

  componentWillMount = () => {
    this.props.dispatch({
      type: STORY_ACTIONS.GET_STORY_DETAILS,
      payload: this.props.match.params.id,
    })
  }

  componentDidUpdate = () => {
    if (this.props.match.params.id != this.props.storyReducer.storyDetails.id) {
      this.props.dispatch({
        type: STORY_ACTIONS.GET_STORY_DETAILS,
        payload: this.props.match.params.id,
      })
    }
  }

  render() {
    const details = {...this.props.storyReducer.storyDetails};

    if (details.genre == null) {
      details.genre = "None";
    }

    return (
      <div className="formContainer" >
        <h2>{details.title}</h2>
        <h4>Synonpsis</h4>
        <p>{details.synopsis}</p>
        <h4>Genre</h4>
        <p>{details.genre}</p>
        <h4>World</h4>
        <p><Link to={`/view/world/${details.world_id}`}>{details.world}</Link></p>
      </div>
    )
  }

}

export default connect(mapStateToRedux)(StoryLayout);