import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { SEARCH_ACTIONS } from '../../redux/actions/searchActions';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
    }
  }

  handleChange = (event) => {
    this.setState ({
      searchQuery: event.target.value,
    })
  }

  submitSearch = () => {
    this.props.dispatch({
      type: SEARCH_ACTIONS.SUBMIT_SEARCH_QUERY,
      payload: this.state.searchQuery,
    })
    this.props.history.push('/results');
  }

  render () {
    return (
      <div>
        <Link className="advancedSearchLink color-secondary-2-2" to="/search">Advanced Search</Link>
        <TextField id="search" label="Search for..." value={this.state.searchQuery} onChange={this.handleChange} />
        <Button variant="outlined" onClick={this.submitSearch}><SearchIcon /></Button>
      </div>
    )
  }
}

export default connect()(SearchBar);