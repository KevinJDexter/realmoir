import React, {Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class StoryOption extends Component {

  setBrowseStory = () => {
    this.props.changeStory(this.props.story.id);
  }

  render () {

    let divClass = 'browseInnerContent';
    if (this.props.story.id === this.props.selectedStory) {
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

export default StoryOption;