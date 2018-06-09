import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button} from '@material-ui/core';
import { LOCATION_ACTIONS} from '../../redux/actions/locationActions';

const mapStateToProps = (reduxState) => ({
  locationReducer: reduxState.locations,
})

class LocationLayout extends Component {

  componentWillMount() {
    this.props.dispatch({ 
      type: LOCATION_ACTIONS.GET_LOCATION_DETAILS,
      payload: this.props.match.params.id,
     });
  }

  render() {
    return (
      <div>
        HITHITHIT
        </div>
    )
  }
}

export default connect(mapStateToProps)(LocationLayout);