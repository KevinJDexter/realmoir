import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import { LOCATION_ACTIONS } from '../../redux/actions/locationActions';

const mapStateToProps = (reduxState) => ({
  createReducer: reduxState.create,
  storyReducer: reduxState.stories,
  locationReducer: reduxState.locations,
})

class LocationEditLayout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startingName: '',
      name: '',
      description: '',
      history: '',
      climate: '',
      img_url: '',
      private_notes: '',
      related_stories: [],
      world_id: '',
    }
  }

  componentWillMount = () => {
    this.props.dispatch({
      type: LOCATION_ACTIONS.GET_LOCATION_DETAILS,
      payload: this.props.match.params.id,
    })
  }

  componentDidUpdate = () => {
    if (!this.props.locationReducer.isLoading && !this.props.locationReducer.locationDetails.id) {
      this.props.history.push('/home');
    }
    if (this.state.startingName !== this.props.locationReducer.locationDetails.name && !this.props.locationReducer.isLoading) {
      let details = { ...this.props.locationReducer.locationDetails };
      for (var key in details) {
        if (details[key] == null) {
          details[key] = '';
        }
      }

      console.log('hit');
      console.log('hit');
      console.log('hit');
      console.log('hit');
      console.log('hit');
      console.log('hit');
      console.log('hit');
      console.log('hit');
      console.log('hit');
      console.log('hit');
      console.log('hit');
      console.log('hit');
      console.log(details);
      this.setState({
        startingName: details.name,
        name: details.name,
        description: details.description,
        history: details.history,
        climate: details.climate,
        img_url: details.img_url,
        private_notes: details.private_notes,
        world_id: details.world_id,
      })
    }
  }


  render () {
    return (
      <div></div>
    )
  }
}

export default connect(mapStateToProps)(LocationEditLayout);
