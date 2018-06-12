import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MenuItem, FormControl, InputLabel, Select } from '@material-ui/core';
import { CREATE_PAGE_ACTIONS } from '../../redux/actions/createPageActions';

class CreateObjectDropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      valueField: 'Character',
    }
  }

  handleChange = (event) => {
    this.setState({
      valueField: event.target.value,
    })
  }

  setCreateType = () => {
    this.props.dispatch({
      type: CREATE_PAGE_ACTIONS.SET_FORM_TYPE,
      payload: this.state.valueField.toLowerCase(),
    })
  }

  render() {
    return (
      <div>
      <FormControl>
        <InputLabel htmlFor='story-select'>Select Object</InputLabel>
        <Select
          style={{ minWidth: "160px" }}
          value={this.state.valueField}
          onChange={this.handleChange}
          inputProps={{ name: 'story', id: 'story-select' }}>
          <MenuItem value='Character'>Character</MenuItem>
          <MenuItem value='Location'>Location</MenuItem>
          <MenuItem value='Event'>Event</MenuItem>
        </Select>
      </FormControl>
      <Link to='/create' onClick={this.setCreateType} >Create a new {this.state.valueField}</Link>
      </div>
    )
  }
}

export default connect()(CreateObjectDropdown);