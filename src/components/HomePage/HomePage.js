import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import { WORLD_ACTIONS } from '../../redux/actions/worldActions';
import { STORY_ACTIONS } from '../../redux/actions/storyActions';
import LinkToWorld from '../LinkToWorld/LinkToWorld';
import LinkToStory from '../LinkToStory/LinkToStory';

const mapStateToProps = (reduxState) => ({ worldsReducer: reduxState.worlds, storiesReducer: reduxState.stories })

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storiesCollected: false,
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: WORLD_ACTIONS.GET_WORLDS })
  }

  componentDidUpdate() {
    if (!this.props.worldsReducer.isLoading
      && this.props.worldsReducer.worlds.length !== 0
      && !this.state.storiesCollected) {
      this.props.dispatch({ type: STORY_ACTIONS.GET_STORIES });
      this.setState({ storiesCollected: true });
    }
  }

  render() {
    console.log(this.props.worldsReducer.worlds);
    return (
      <div>
        <Header title="Realmoir" history={this.props.history} />
        <h2>Home Page</h2>
        <div>
          {this.props.worldsReducer.worlds.map(world => <LinkToWorld key={world.id} world={world} />)}
        </div>
        <div>
          {this.props.storiesReducer.stories.map(story => <LinkToStory key={story.id} story={story} />)}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(HomePage);