import React, {Component} from 'react';
import CreateWorldsDropdown from '../CreateWorldsDropdown/CreateWorldsDropdown';
import CreateStoriesDropdown from '../CreateStoriesDropdown/CreateStoriesDropdown';

class CreatePageSidebar extends Component {
  render () {
    return (
      <div className="createSidebarDiv">
        <CreateWorldsDropdown />
        <a className="createNewLink" to="/create">Create new World</a>
        <br />
        <CreateStoriesDropdown />
        <a className="createNewLink" to="/create">Create new Story</a>
      </div>
    )
  }
}

export default CreatePageSidebar;