import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { BROWSE_ACTIONS } from '../../redux/actions/browseActions';
import { Link } from 'react-router-dom';

class WorldOption extends Component {

  setBrowseWorld = () => {
    this.props.dispatch({ 
      type: BROWSE_ACTIONS.CHANGE_BROWSE_WORLD,
      payload: this.props.world,
    })
  }

  render() {
    return (
      <div className="browseDiv" >
        <div className="browseInnerContent">
        <Button variant="contained" onClick={this.setBrowseWorld} >
          {this.props.world.name}
        </Button>
        <br />
        <Link to={`/view/world/${this.props.world.id}`}>View</Link>
        </div>
      </div>
    )
  }
}

export default connect()(WorldOption);