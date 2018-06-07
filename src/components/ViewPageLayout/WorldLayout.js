import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';

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

    return (
      <div className="formContainer" >
        <h2>{details.name}</h2>
        <h4>Description</h4>
        <p>{descriptionContent}</p>
        <ul className="worldStoriesList" >
          <li><label>Stories:</label></li>
          {storiesContent}
        </ul>
      </div>
    )
  }

}

export default connect(mapStateToRedux)(WorldLayout);