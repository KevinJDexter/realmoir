import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class LinkToStory extends Component {

  render() {
    const story = this.props.story;
    const linkTo = `/view/story/${story.id}`;

    console.log('TEST', story)

    return (
      <Link to={linkTo}>
        {story.title}
      </Link>
    )
  }
}

export default LinkToStory;