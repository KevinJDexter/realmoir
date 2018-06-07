import React, {Component} from 'react';
import {connect} from 'react-redux';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';
import { TextField, Button } from '@material-ui/core';

const mapStateToRedux = (reduxState) => ({worldReducer: reduxState.worlds});

class WorldEditLayout extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      img_url: '',
      private_notes: '',
    }
  }

  componentWillMount = () => {
    this.props.dispatch ({
      type: WORLD_ACTIONS.GET_WORLD_DETAILS,
      payload: this.props.match.params.id,
    })
  }

  componentDidUpdate = () => {
    if (this.state.name != this.props.worldReducer.worldDetails.name && !this.props.worldReducer.isLoading) {
      const details = { ...this.props.worldReducer.worldDetails };
      this.setState({
        name: details.name,
        description: details.description,
        img_url: details.img_url,
        private_notes: details.private_notes,
      })
    }
  }

  handleChange = (property) => (event) => {
    this.setState({
      [property]: event.target.value,
    })
  }

  confirmEdits = () => {
    const action = {
      type: WORLD_ACTIONS.SUBMIT_WORLD_EDITS,
      payload: this.state,
    }
  }

  render() {

    return (
      <div>
      <h2>Modifying World: {this.props.worldReducer.worldDetails.name}</h2>
        <form>
          <TextField className="createFormName" label="Name" value={this.state.name} onChange={this.handleChange('name')} />
          <br />
          <br />
          <TextField className="createFormDescription" rows="6" multiline label="Description" value={this.state.description} onChange={this.handleChange('description')} />
          <br />
          <br />
          <TextField className="createFormUrl" label="Image URL" value={this.state.img_url} onChange={this.handleChange('img_url')} />
          <br />
          <br />
          <TextField className="createFormNotes" multiline rows="4" label="Private Notes" value={this.state.private_notes} onChange={this.handleChange('private_notes')} />
          <br />
          <br />
          <Button variant="contained" className="createFormButton" color="primary" raised="raised" onClick={this.confirmEdits}>Save Edits</Button>
        </form>
        </div>
    )
  }
}

export default connect(mapStateToRedux)(WorldEditLayout)