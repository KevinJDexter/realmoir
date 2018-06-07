import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';
import { STORY_ACTIONS } from '../../redux/actions/storyActions';

import './BrowsePage.css';
import WorldOption from '../BrowseObjectOptions/WorldOption';

const mapStateToProps = (reduxState) => ({worldReducer: reduxState.worlds, storyReducer: reduxState.stories})

class BrowsePage extends Component {

  componentWillMount = () => {
    this.props.dispatch({type: WORLD_ACTIONS.GET_WORLDS});
  }

  render() {

    

    return (
      <div style={{ height: window.innerHeight, width: window.innerWidth }}>
        <Header title="Realmoir" history={this.props.history} />
        <div className="mainView" >
          <div className="browsePageContent" >
            <h2>Browse</h2>
            <hr className="browseLineBreak" />
            <div className="objectContent">
            {this.props.worldReducer.worlds.map(world => <WorldOption key={world.id} world={world} />)}
            </div>
            <hr className="browseLineBreak" />
          </div>
          <div className="sidebarDiv">
            <Sidebar />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(BrowsePage);