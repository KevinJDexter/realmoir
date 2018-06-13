import React, {Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class EventOption extends Component {

  render () {
    return (
      <div className="browseDiv" >
        <div className="browseInnerContent">
        <Link to={`/view/event/${this.props.event.id}`}>{this.props.event.name}</Link>
        </div>
      </div>
    )
  }
}

export default EventOption;