import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { BROWSE_ACTIONS } from '../../redux/actions/browseActions';
import { connect } from 'react-redux';

const mapStateToRedux = (reduxState) => ({
  browse: reduxState.browse,
})

class ObjectOption extends Component {

  setAfterWorldOption = () => {
    this.props.dispatch({
      type: BROWSE_ACTIONS.SET_AFTER_WORLD_OPTION,
      payload: this.props.option.toLowerCase()
  })
}

render() {

  let divClass = 'browseInnerContent';
  if (this.props.browse.afterWorldOption === this.props.option.toLowerCase()) {
    divClass += 'Selected';
  }

  return (
    <div className="browseDiv" >
      <div className={divClass}>
        <Button variant="contained" onClick={this.setAfterWorldOption} >
          {this.props.option}
        </Button>
      </div>
    </div>
  )
}
}

export default connect(mapStateToRedux)(ObjectOption);