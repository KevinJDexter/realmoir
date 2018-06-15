import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import './SearchResultsPage.css';
import SearchResultRow from '../SearchResultRow/SearchResultRow';

const mapStateToProps = (reduxState) => ({ searchReducer: reduxState.search });

class SearchResultsPage extends Component {
  render() {

    let noResults = <div></div>
    if (this.props.searchReducer.searchResults.length === 0) {
      noResults = <h3>There were no items matching your search request</h3>
    }

    return (
      <div style={{ height: window.innerHeight, display: "flex", flexDirection: "column" }}>
        <Header title="Realmoir" history={this.props.history} />
        <div className="mainView">
          <div className="searchPageContent">
            <h2>Search Results</h2>
            <hr className="searchLineBreak" />
            {this.props.searchReducer.searchResults.map(item => <div key={`${item.objectType}${item.id}`}><SearchResultRow item={item} history={this.props.history} /><hr /></div>)}
            {noResults}
          </div>
          <div className="sidebarDiv">
            <Sidebar />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(SearchResultsPage);