import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RECENTLY_ADDED_ACTIONS } from '../../redux/actions/recentlyAddedActions'
import SidebarItem from '../SidebarItem/SidebarItem';

const mapStateToProps = (reduxState) => ({ sidebarReducer: reduxState.recentlyAdded });

class Sidebar extends Component {

  componentDidMount() {
    const action = {
      type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED
    }
    this.props.dispatch(action);
  }

  render () {
    return (
      <div>
        <h3 className="sidebarHeader">Recently Added</h3>
        <ul className="sidebarList">
          {this.props.sidebarReducer.recentlyAdded.map(item => <SidebarItem key={item.objectType + item.id} item={item} />)}
        </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Sidebar);