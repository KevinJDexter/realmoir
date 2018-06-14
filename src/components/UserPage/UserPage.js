import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import './UserPage.css';
import { Button, RadioGroup, Radio, TextField, FormControl, FormControlLabel, FormLabel } from '@material-ui/core';


const mapStateToProps = state => ({
  user: state.user,
});

class UserPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      editOn: false,
      firstName: '',
      lastName: '',
      email: '',
      userName: '',
      contentPrivate: '',
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleChange = (property) => (event) => {
    this.setState({
      [property]: event.target.value,
    })
  }

  toggleEdit = () => {
    this.setState({
      editOn: !this.state.editOn,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      userName: this.props.user.userName,
      contentPrivate: String(this.props.user.contentPrivate),
    })
  }

  submitEdits = () => {
    let contentPrivate = false;
    if (this.state.contentPrivate === 'true') {
      contentPrivate = true;
    }
    this.props.dispatch({
      type: USER_ACTIONS.EDIT_USER,
      payload: { ...this.state, contentPrivate: contentPrivate },
    })
    this.toggleEdit();
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('home');
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      if (this.state.editOn) {
        content = <div>
          <TextField className="userFormStandard" label="First Name" value={this.state.firstName} onChange={this.handleChange('firstName')} />
          <br />
          <TextField className="userFormStandard" label="Last Name" value={this.state.lastName} onChange={this.handleChange('lastName')} />
          <br />
          <TextField className="userFormStandard" label="E-mail" value={this.state.email} onChange={this.handleChange('email')} />
          <br />
          <TextField className="userFormStandard" label="Username" value={this.state.userName} onChange={this.handleChange('userName')} />
          <br />
          <FormControl >
            <FormLabel >Content</FormLabel>
            <RadioGroup
              name="contentPrivate"
              value={this.state.contentPrivate}
              onChange={this.handleChange('contentPrivate')}
            >
              <FormControlLabel value="false" control={<Radio />} label="Public" />
              <FormControlLabel value="true" control={<Radio />} label="Private" />
            </ RadioGroup>
          </FormControl>
          <br />
          <Button className="userButton" color="primary" variant="raised" onClick={this.submitEdits}>
            Submit Edits
            </Button>
          <Button className="userButton" color="secondary" variant="raised" onClick={this.toggleEdit}>
            Cancel
            </Button>
        </div>
      } else {
        let isPrivate = "Public";
        if (this.props.user.contentPrivate) {
          isPrivate = "Private";
        }
        content = (
          <div>
            <h2
              id="welcome"
            >
              Welcome, {this.props.user.firstName} {this.props.user.lastName}!
          </h2>
            <div>
              <p><strong>E-mail: </strong>{this.props.user.email}</p>
              <p><strong>Username: </strong>{this.props.user.userName}</p>
              <p><strong>Content: </strong>{isPrivate}</p>
            </div>
            <Button className="userButton" color="primary" variant="raised" onClick={this.toggleEdit}>
              Edit User
            </Button>
            <Button className="userButton" color="secondary" variant="raised" onClick={this.logout}>
              Log Out
            </Button>
          </div>
        );
      }
    }

    return (
      <div style={{ width: window.innerWidth, height: window.innerHeight, display: "flex", flexDirection: "column" }}>
        <Header history={this.props.history} />
        <div className="mainView">
          <div className="userContent">
            {content}
          </div>
          <div className="sidebarDiv">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

