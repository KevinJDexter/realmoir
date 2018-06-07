import React, { Component } from 'react';

class WorldOption extends Component {
  render() {
    return (
      <div className="browseDiv" >{this.props.world.name}</div>
    )
  }
}

export default WorldOption;