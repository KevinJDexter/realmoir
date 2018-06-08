import React, { Component } from 'react';
import CreateWorldsDropdown from '../CreateWorldsDropdown/CreateWorldsDropdown';
import CreateStoriesDropdown from '../CreateStoriesDropdown/CreateStoriesDropdown';
import { CREATE_PAGE_ACTIONS } from '../../redux/actions/createPageActions';
import { connect } from 'react-redux';

const mapStateToRedux = (reduxState) => ({ createPageReducer: reduxState.create })

class CreatePageSidebar extends Component {


  getStoryForm = () => {
    this.props.dispatch({
      type: CREATE_PAGE_ACTIONS.SET_FORM_TYPE,
      payload: 'story',
    })
  }

  getWorldForm = () => {
    this.props.dispatch({
      type: CREATE_PAGE_ACTIONS.SET_FORM_TYPE,
      payload: 'world',
    })
  }

  render() {

    let storyDiv = <div></div>
    if (this.props.createPageReducer.world.id) {
      storyDiv = <div className="createSidebarDropdown">
        <CreateStoriesDropdown />
        <br />
        <p>OR</p>
        <a className="createNewLink color-secondary-1-0" onClick={this.getStoryForm} >Create new Story</a>
      </div>
    }

    return (
      <div className="createPageSidebarContent">
        <div className="createSidebarDropdown">
          <CreateWorldsDropdown />
          <br />
          <p>OR</p>
          <a className="createNewLink color-secondary-1-0" onClick={this.getWorldForm} >Create new World</a>
        </div>
        <br />
        {storyDiv}
      </div>
    )
  }
}

export default connect(mapStateToRedux)(CreatePageSidebar);