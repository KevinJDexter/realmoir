import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { BROWSE_ACTIONS } from '../../redux/actions/browseActions';
import { FormControl } from '@material-ui/core';

const mapStateToProps = (reduxState) => ({ browseReducer: reduxState.browse, worldReducer: reduxState.worlds });

class CreateWorldsDropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      valueField: '',
    }
  }

  componentDidUpdate = () => {
    if (this.props.browseReducer.browse.world.id && this.state.valueField !== this.props.browseReducer.browse.world.id) {
      this.setState({
        valueField: this.props.browseReducer.browse.world.id,
      })
    }
  }

  handleChange = (event) => {
    const payload = this.props.worldReducer.worlds.filter(world => world.id === event.target.value)[0];
    const action = {
      type: 'CHANGE_BROWSE_WORLD',
      payload: payload,
    }
    this.props.dispatch(action);

  }

  render() {

    return (
      <FormControl>
        <InputLabel htmlFor='world-select'>World</InputLabel>
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