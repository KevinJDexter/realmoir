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
    let details = {...this.props.locationReducer.locationDetails};

    if (details.description === null) {
      details.description = "None";
    }
    
    if (details.history === null) {
      details.history = "None";
    }

    if (details.climate === null) {
      details.climate = "None";
    }

    let storiesContent = <li className="linkedElements">None</li>
    if (details.stories.length > 0) {
      storiesContent = details.stories.map(story => <Link className="linkedElements" key={story.id} to={`/view/story/${story.id}`} >{story.title}</Link> )
    }

    let editButton = <Button onClick={this.editLocation} variant="contained" color="primary" > Edit Location</Button>;
    let privateNotes = <div><h4>Notes:</h4><p>{details.private_notes}</p></div>;

    if (details.is_owner === false) {
      editButton = <div></div>;
      privateNotes = <div></div>;
    }

    return (
      <div className="formContainer" >
        <h2>{details.name}</h2>
        <h4>Description</h4>
        <p>{details.description}</p>
        <h4>History</h4>
        <p>{details.history}</p>
        <h4>Climate</h4>
        <p>{details.climate}</p>
        <h4>World</h4>
        <p><Link to={`/view/world/${details.world_id}`}>{details.world}</Link></p>
        {privateNotes}
        <ul className="connectionList" >
          <li><strong>Stories:</strong></li>
          {storiesContent}
        </ul>
        {editButton}
      </div>
    )
  }
}

export default connect(mapStateToProps)(LocationLayout);