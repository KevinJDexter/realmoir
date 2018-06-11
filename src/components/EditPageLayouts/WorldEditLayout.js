import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';
import { TextField, Button } from '@material-ui/core';

const mapStateToRedux = (reduxState) => ({ worldReducer: reduxState.worlds });

class WorldEditLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startingName: '',
      name: '',
      description: '',
      img_url: '',
      private_notes: '',
    }
  }

  componentWillMount = () => {
    this.props.dispatch({
      type: WORLD_ACTIONS.GET_WORLD_DETAILS,
      payload: this.props.match.params.id,
    })
  }

  componentDidUpdate = () => {
    if (!this.props.worldReducer.isLoading && !this.props.worldReducer.worldDetails.id) {
      this.props.history.push('/home');
    }
    if (this.state.startingName !== this.props.worldReducer.worldDetails.name && !this.props.worldReducer.isLoading) {
      let details = { ...this.props.worldReducer.worldDetails };
      for (var key in details) {
        if (details[key] == null) {
          details[key] = '';
        }
      }
      console.log(details);
      this.setState({
        startingName: details.name,
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
    let toSend = {...this.state};
    for (var key in toSend) {
      if (toSend[key] === '') {
        toSend[key] = null;
      }
    }
    const action = {
      type: WORLD_ACTIONS.SUBMIT_WORLD_EDITS,
      payload: toSend,
      id: this.props.match.params.id,
    }
    this.props.dispatch(action);
    this.props.history.push(`/view/world/${this.props.match.params.id}`);
  }

  deleteWorld = () => {
    const toDelete = window.confirm('Are you sure you want to delete this world? This can\'t be undone.');
    if (toDelete) {
      this.props.dispatch({
        type: WORLD_ACTIONS.DELETE_WORLD,
        payload: this.props.match.params.id,
      })
      this.props.history.push('/home');
    }
  }

  render() {

    return (
      <div>
        <h2>Modifying World: {this.props.worldReducer.worldDetails.name}</h2>
        <form>
          <TextField className="editFormName" label="Name" value={this.state.name} onChange={this.handleChange('name')} />
          <br />
          <br />
          <TextField className="editFormDescription" rows="6" multiline label="Description" value={this.state.description} onChange={this.handleChange('description')} />
          <br />
          <br />
          <TextField className="editFormUrl" label="Image URL" value={this.state.img_url} onChange={this.handleChange('img_url')} />
          <br />
          <br />
          <TextField className="editFormNotes" multiline rows="4" label="Private Notes" value={this.state.private_notes} onChange={this.handleChange('private_notes')} />
          <br />
          <br />
          <Button variant="contained" id="confirmWorldEditsButton" color="primary" onClick={this.confirmEdits}>Save Edits</Button>
          <Button variant="contained" id="deleteWorldButton" color="secondary" onClick={this.deleteWorld}>Delete World</Button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToRedux)(WorldEditLayout)