import React, { Component } from 'react';
import Header from '../Header/Header';
import WorldEditLayout from '../EditPageLayouts/WorldEditLayout';
import StoryEditLayout from '../EditPageLayouts/StoryEditLayout';
import Sidebar from '../Sidebar/Sidebar';
import { connect } from 'react-redux';
import { USER_ACTIONS } from '../../redux/actions/userActions';

import './EditPage.css';
import LocationEditLayout from '../EditPageLayouts/LocationEditLayout';
import CharacterEditLayout from '../EditPageLayouts/CharacterEditLayout';
import EventEditLayout from '../EditPageLayouts/EventEditLayout';

const mapStateToProps = (reduxState) => ({
  user: reduxState.user,
})

class EditPage extends Component {

  componentDidMount() {
    if (!this.props.user.userName && !this.props.user.isLoading) {
      this.props.history.push('/home');
    }
  }

  componentWillMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  render () {

    let componentToMount = <div></div>
    if (this.props.match.params.type === 'world') {
      componentToMount = <WorldEditLayout match={this.props.match} history={this.props.history} />
    } else if (this.props.match.params.type === 'story') {
      componentToMount = <StoryEditLayout match={this.props.match} history={this.props.history} />
    } else if (this.props.match.params.type === 'location') {
      componentToMount = <LocationEditLayout match={this.props.match} history={this.props.history} />
    } else if (this.props.match.params.type === 'character') {
      componentToMount = <CharacterEditLayout match={this.props.match} history={this.props.history} />
    }else if (this.props.match.params.type === 'event') {
      componentToMount = <EventEditLayout match={this.props.match} history={this.props.history} />
    }

    return (
      <div style={{ width: window.innerWidth, height: window.innerHeight, display: "flex", flexDirection: "column" }}>
        <Header title="Realmoir" history={this.props.history} />
        <div className="mainView">
          <div className="viewPageContent">
            {componentToMount}
          </div>
          <div className="sidebarDiv">
            <Sidebar />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(EditPage);