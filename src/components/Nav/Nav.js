import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link className="color-secondary-2-2" to="/user">
            User
          </Link>
        </li>
        <li>
          <Link className="color-secondary-2-2" to="/home">
            Home
          </Link>
        </li>
        <li>
          <Link className="color-secondary-2-2" to="/browse">
            Browse
          </Link>
        </li>
        <li>
          <Link className="color-secondary-2-2" to="/create">
            Create
          </Link>
        </li>
        <li>
          <Link className="color-secondary-2-2" to="/faq">
            FAQ
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
