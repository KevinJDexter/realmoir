import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { CREATE_PAGE_ACTIONS } from '../../redux/actions/createPageActions';
import { FormControl } from '@material-ui/core';

const mapStateToProps = (reduxState) => ({worldReducer: reduxState.worlds, createReducer: reduxState.create });

class CreateWorldsDropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      valueField: '',
    }
  }

  componentDidMount = () => {
    if (this.props.createReducer.world.id && this.state.valueField !== this.props.createReducer.world.id) {
      this.setState({
        valueField: this.props.createReducer.world.id,
      })
    }
    console.log(this.props.createReducer.world.id);
  }

  componentDidUpdate = () => {
    if (this.props.createReducer.world.id && this.state.valueField !== this.props.createReducer.world.id) {
      this.setState({
        valueField: this.props.createReducer.world.id,
      })
    }
  }

  handleChange = (event) => {
    const payload = this.props.worldReducer.worlds.filter(world => world.id === event.target.value)[0];
    const action = {
      type: CREATE_PAGE_ACTIONS.CHANGE_CREATE_WORLD,
      payload: payload,
    }
    this.props.dispatch(action);

  }

  render() {

    return (
      <FormControl>
        <InputLabel htmlFor='world-select'>Select World</InputLabel>
        <Select
          style={{minWidth: "160px"}}
          value={this.state.valueField}
          onChange={this.handleChange}
          inputProps={{ name: 'world', id: 'world-select' }}>
          {this.props.worldReducer.worlds.map(world => <MenuItem key={world.id} value={world.id}>{world.name}</MenuItem>)}
        </Select>
      </FormControl>
    )
  }
}

export default connect(mapStateToProps)(CreateWorldsDropdown);