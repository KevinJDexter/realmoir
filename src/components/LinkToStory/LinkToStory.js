import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LinkToStory extends Component {

  render() {
    const story = this.props.story;
    const linkTo = `/view/story/${story.id}`;

    console.log('TEST', story)

    return (
      <div style={{ marginBottom: "8px" }}>
        <Link to={linkTo}>
          {story.title}
        </Link>
      </div>
    )
  }
}

export default LinkToStory;