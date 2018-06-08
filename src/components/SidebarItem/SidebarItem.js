import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Public from '@material-ui/icons/Public';
import Book from '@material-ui/icons/Book';
import Location from '@material-ui/icons/LocationCity';

class SidebarItem extends Component {
  render() {

    let toDisplay = <div></div>
    let icon = <span></span>
    switch (this.props.item.objectType) {
      case 'world':
        icon = <Public />
        toDisplay = <Link to={`/view/world/${this.props.item.id}`}>{this.props.item.name} - {icon}</Link>
        break;
      case 'story':
        icon = <Book />
        toDisplay = <Link to={`/view/story/${this.props.item.id}`}>{this.props.item.title} - {icon}</Link>
        break;
      case 'location':
        icon = <Location />
        toDisplay = <Link to={`/view/location/${this.props.item.id}`}>{this.props.item.name} - {icon}</Link>
        break;
      default:
        break;
    }
    return (
      <li>{toDisplay}</li>
    )
  }
}

export default SidebarItem;