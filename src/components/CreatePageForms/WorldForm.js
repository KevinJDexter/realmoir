import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, Typography, Button } from '@material-ui/core';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';

const mapStateToProps = (reduxState) => ({worldReducer: reduxState.wo})

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
      if (toSend[key] == '') {
        toSend[key] = null;
      }
    }
    if (toSend.name !== null ) {
      this.props.dispatch({ type: WORLD_ACTIONS.POST_CREATE_WORLD, payload: toSend })
    } else {
      alert('New World must be named');
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
          <Button variant="contained" className="createFormButton" color="primary" raised="raised" onClick={this.submitWorld}>Create World</Button>
          <br />
          <br />
          {JSON.stringify(this.state)}
        </form>
      </div>
    )
  }
}

export default connect()(WorldForm);