import React, {Component } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class CharacterOption extends Component {

  render () {
    return (
      <div className="browseDiv" >
        <div className="browseInnerContent">
        <Link to={`/view/character/${this.props.character.id}`}>{this.props.character.name}</Link>
        </div>
      </div>
    )
  }
}

export default CharacterOption;