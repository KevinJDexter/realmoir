import React, {Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class LocationOption extends Component {

  render () {
    return (
      <div className="browseDiv" >
        <div className="browseInnerContent">
        <Link to={`/view/location/${this.props.location.id}`}>{this.props.location.name}</Link>
        </div>
      </div>
    )
  }
}

export default LocationOption;