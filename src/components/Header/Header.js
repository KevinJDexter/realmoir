import React from 'react';
import Nav from '../Nav/Nav';
import SearchBar from '../SearchBar/SearchBar';
import { Grid } from '@material-ui/core';
import PageTitle from '../PageTitle/PageTitle';
import LoginStatus from '../LoginStatus/LoginStatus';

const Header = (props) => (
  <div className="header">
    <Grid container spacing={24}>
      <Grid className="headerGrid" item xs={12} sm={4} md={2} lg={2}>
        <PageTitle title={props.title}/>
      </Grid>
      <Grid className="headerGrid" item xs={12} sm={8} md={5} lg={6}>
        <Nav />
      </Grid>
      <Grid className="headerGrid" item xs={12} sm={12} md={5} lg={4}>
        <Grid container>
          <Grid className="headerGrid" item xs={12}>
            <LoginStatus />
          </Grid>
          <Grid className="headerGrid" item xs={12}>
            <SearchBar history={props.history}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export default Header;
