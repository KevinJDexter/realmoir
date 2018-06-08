import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Public from '@material-ui/icons/Public';
import Book from '@material-ui/icons/Book';

class SearchResultRow extends Component {

  render() {
    const item = this.props.item;

    let toDisplay = <div></div>
    switch (item.objectType) {
      case 'world':
        toDisplay = <div>
          <div>
            <Public />
            <h3 className="searchItemType" >
              <Link to={`/view/world/${item.id}`} >{item.name}</Link>
            </h3>
            <Public />
          </div>
          <p className="searchItemContent" >
            {item.description}
          </p>
        </div>;
        break;
      case 'story':
        toDisplay = <div>
          <div>
            <Book />
            <h3 className="searchItemType" >
              <Link to={`/view/story/${item.id}`} >
                {item.title}
              </Link>
            </h3>
            <Book />
          </div>
          <p className="searchItemContent" >
            {item.synopsis}
          </p>
        </div>;
        break;
      default:
        break;
    }

    return (
      <div>
        {toDisplay}
      </div>
    )
  }
}

export default SearchResultRow;