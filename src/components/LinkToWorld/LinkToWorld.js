import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LinkToWorld extends Component {

  render() {
    const world = this.props.world;
    const linkTo = `/view/world/${world.id}`;

    return (
      <div className="homeBrowseLinks">
        <Link to={linkTo}>
          {world.name}
        </Link>
      </div>
    )
  }
}

export default LinkToWorld;