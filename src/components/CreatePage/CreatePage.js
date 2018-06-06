import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import CreatePageSidebar from '../CreatePageSidebar/CreatePageSidebar';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';
import WorldForm from '../CreatePageForms/WorldForm';

import './CreatePage.css';

class CreatePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  updateWindowDimensions = () => {
    if (window.innerWidth !== this.state.width || window.innerHeight !== this.state.height) {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
  }

  componentDidMount() {
    this.props.dispatch({type: WORLD_ACTIONS.GET_WORLDS})
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  componentWillMount = () => {
    window.addEventListener("resize", this.updateWindowDimensions)
  }

  render() {
    let formToDisplay = <div></div>;
    formToDisplay = <WorldForm />;

    return (
      <div style={{width: this.state.width, height: this.state.height}}>
        <Header history={this.props.history} />
        <div className="mainView">
          <div className="createSidebarDiv">
            <CreatePageSidebar />
          </div>
          <div className="createPageContent">
            <h2>Create</h2>
            {formToDisplay}
          </div>
          <div className="sidebarDiv">
            <Sidebar />
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(CreatePage);