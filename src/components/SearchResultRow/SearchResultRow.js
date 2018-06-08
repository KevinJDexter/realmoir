import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import World from '@material-ui/icons/Public';
import Book from '@material-ui/icons/Book';
import Location from '@material-ui/icons/LocationCity';

class SearchResultRow extends Component {

  render() {
    
    let item = { ...this.props.item };
    for (var key in item) {
      if (item[key] === null) {
        item[key] = 'N/A';
      }
    }

    let toDisplay = <div></div>
    switch (item.objectType) {
      case 'world':
        toDisplay = <div>
          <div>
            <World />
            <h3 className="searchItemType" >
              <Link to={`/view/world/${item.id}`} >{item.name}</Link>
            </h3>
            <World />
          </div>
          <p className="searchItemContent" >
            <strong>Description: </strong>{item.description}
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
            <strong>Genre: </strong>{item.genre}
          </p>
          <p className="searchItemContent" >
            <strong>Synopsis: </strong>{item.synopsis}
          </p>
        </div>;
        break;
      case 'location':
        toDisplay = <div>
          <div>
            <Location />
            <h3 className="searchItemType" >
              <Link to={`/view/location/${item.id}`} >
                {item.name}
              </Link>
            </h3>
            <Location />
          </div>
          <p className="searchItemContent">
            <strong>Climate: </strong>{item.climate}
          </p>
          <p className="searchItemContent">
            <strong>Description: </strong>{item.description}
          </p>
          <p className="searchItemContent">
            <strong>History: </strong>{item.history}
          </p>
        </div>
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