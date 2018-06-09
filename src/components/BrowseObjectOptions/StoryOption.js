import React, {Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { BROWSE_ACTIONS } from '../../redux/actions/browseActions';

const mapStateToRedux = (reduxState) => ({
  browse: reduxState.browse,
})

class StoryOption extends Component {

  setBrowseStory = () => {
    this.props.dispatch({
      type: BROWSE_ACTIONS.SET_BROWSE_STORY,
      payload: this.props.story,
    })
  }

  render () {

    let divClass = 'browseInnerContent';
    if (this.props.story.id === this.props.browse.story.id) {
      divClass += 'Selected';
    }

    return (
      <div className="browseDiv" >
        <div className={divClass}>
        <Button variant="contained" onClick={this.setBrowseStory} >
          {this.props.story.title}
        </Button>
        <br />
        <Link to={`/view/story/${this.props.story.id}`}>View</Link>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToRedux)(StoryOption);