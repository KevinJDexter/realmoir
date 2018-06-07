import React, {Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class StoryOption extends Component {
  render () {
    return (
      <div className="browseDiv" >
        <div className="browseInnerContent">
        <Button variant="contained" >
          {this.props.story.title}
        </Button>
        <br />
        <Link to={`/view/story/${this.props.story.id}`}>View</Link>
        </div>
      </div>
    )
  }
}

export default StoryOption;