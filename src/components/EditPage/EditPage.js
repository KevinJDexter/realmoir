import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import WorldEditLayout from '../EditPageLayouts/WorldEditLayout';
import StoryEditLayout from '../EditPageLayouts/StoryEditLayout';

class EditPage extends Component {
  render () {

    let componentToMount = <div></div>
    if (this.props.match.params.type === 'world') {
      componentToMount = <WorldEditLayout match={this.props.match} history={this.props.history} />
    } else if (this.props.match.params.type === 'story') {
      componentToMount = <StoryEditLayout match={this.props.match} history={this.props.history} />
    }

    return (
      <div>
        <Header title="Realmoir" history={this.props.history} />
        <h2>Edit Page</h2>
        {componentToMount}
      </div>
    )
  }
}

export default EditPage;