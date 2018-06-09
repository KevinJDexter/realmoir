import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { BROWSE_ACTIONS } from '../../redux/actions/browseActions';
import { connect } from 'react-redux';

const mapStateToRedux = (reduxState) => ({
  browse: reduxState.browse,
})

class AfterStoryObjectOption extends Component {

  setAfterStoryOption = () => {
    this.props.dispatch({
      type: BROWSE_ACTIONS.CHANGE_AFTER_STORY_OPTION,
      payload: this.props.option.toLowerCase(),
      id: this.props.browse.story.id,
  })
}

render() {

  let divClass = 'browseInnerContent';
  if (this.props.browse.afterStoryOption === this.props.option.toLowerCase()) {
    divClass += 'Selected';
  }

  return (
    <div className="browseDiv" >
      <div className={divClass}>
        <Button variant="contained" onClick={this.setAfterStoryOption} >
          {this.props.option}
        </Button>
      </div>
    </div>
  )
}
}

export default connect(mapStateToRedux)(AfterStoryObjectOption);