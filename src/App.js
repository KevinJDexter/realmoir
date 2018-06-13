import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import AboutPage from './components/AboutPage/AboutPage';
import AdvancedSearchPage from './components/AdvancedSearchPage/AdvancedSearchPage';
import BrowsePage from './components/BrowsePage/BrowsePage';
import CreatePage from './components/CreatePage/CreatePage';
import EditPage from './components/EditPage/EditPage';
import HomePage from './components/HomePage/HomePage';
import SearchResultsPage from './components/SearchResultsPage/SearchResultsPage';
import ViewPage from './components/ViewPage/ViewPage';

import './styles/main.css';
import './styles/color-classes.css';

const App = () => (
  <div>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/login"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        {/* <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/about"
          component={AboutPage}
        /> */}
        <Route
          className="TEST"
          path="/home"
          component={HomePage}
        />
        <Route
          path="/search"
          component={AdvancedSearchPage}
        />
        <Route
          path="/results"
          component={SearchResultsPage}
        />
        <Route
          path="/browse"
          component={BrowsePage}
        />
        <Route
          path="/create"
          component={CreatePage}
        />
        <Route
          path="/edit/:type/:id"
          component={EditPage}
        />
        <Route
          path="/view/:type/:id"
          component={ViewPage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
