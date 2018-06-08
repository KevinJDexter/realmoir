import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';

const mapStateToProps = (reduxState) => ({worldReducer: reduxState.worlds})

class WorldForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      img_url: '',
      private_notes: '',
    }
  }

  handleChange = (property) => (event) => {
    this.setState({
      [property]: event.target.value,
    })
  }

  submitWorld = () => {
    let toSend = {...this.state};
    for (var key in toSend) {
      if (toSend[key] === '') {
        toSend[key] = null;
      }
    }
    let worldsWithName = this.props.worldReducer.worlds.filter(world => world.name === toSend.name);
    if (toSend.name !== null && worldsWithName.length === 0 ) {
      this.props.dispatch({ type: WORLD_ACTIONS.SUBMIT_NEW_WORLD, payload: toSend });
      this.props.history.push('/home');
    } else {
      alert('New World must be named a unique name');
    }
  }

  render() {
    return (
      <div>
        <h3>New World</h3>
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
          <Button variant="contained" className="createFormButton" color="primary" onClick={this.submitWorld}>Create World</Button>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(WorldForm);