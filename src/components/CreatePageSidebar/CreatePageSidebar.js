import React, { Component } from 'react';
import CreateWorldsDropdown from '../CreateWorldsDropdown/CreateWorldsDropdown';
import CreateStoriesDropdown from '../CreateStoriesDropdown/CreateStoriesDropdown';
import { CREATE_PAGE_ACTIONS } from '../../redux/actions/createPageActions';
import { connect } from 'react-redux';

const mapStateToRedux = (reduxState) => ({ createPageReducer: reduxState.create })

class CreatePageSidebar extends Component {


  getForm = (type) => () => {
    this.props.dispatch({
      type: CREATE_PAGE_ACTIONS.SET_FORM_TYPE,
      payload: type,
    })
  }

  getFormFromWorld = (type) => () => {
    this.props.dispatch({
      type: CREATE_PAGE_ACTIONS.CLEAR_CREATE_STORY,
    });
    this.getForm(type)();
  }

  render() {

    let worldSelectedDiv = <div></div>
    if (this.props.createPageReducer.world.id) {
      worldSelectedDiv = <div>
        <a className="createNewLink color-secondary-1-0" onClick={this.getForm('story')} >Create new Story in World</a>
        <a className="createNewLink color-secondary-1-0" onClick={this.getFormFromWorld('character')} >Create new Character in World</a>
        <a className="createNewLink color-secondary-1-0" onClick={this.getFormFromWorld('location')} >Create new Location in World</a>
      </div>
    }

    let storyDiv = <div></div>
    if (this.props.createPageReducer.world.id) {
      storyDiv = <div>
        <p>OR</p>
        <CreateStoriesDropdown />
      </div>
    }

    let storySelectedDiv = <div></div>
    if (this.props.createPageReducer.story.id) {
      storySelectedDiv = <div>
        <a className="createNewLink color-secondary-1-0" onClick={this.getForm('character')} >Create new Character in Story</a>
        <a className="createNewLink color-secondary-1-0" onClick={this.getForm('location')} >Create new Location in Story</a>
      </div>
    }

    return (
      <div className="createPageSidebarContent">
        <div className="createSidebarOptions">
          <a className="createNewLink color-secondary-1-0" onClick={this.getForm('world')} >Create new World</a>
          <p>OR</p>
          <CreateWorldsDropdown />
        </div>
        <br />
        {worldSelectedDiv}
        {storyDiv}
        {storySelectedDiv}
      </div>
    )
  }
}

export default connect(mapStateToRedux)(CreatePageSidebar);