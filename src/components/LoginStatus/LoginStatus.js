import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = (reduxState) => ({ user: reduxState.user })

class LoginStatus extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('/home');
  }

  render() {
    let options = <div></div>
    if (this.props.user.userName !== null) {
      options = <div>
        <p>
          Welcome back, {this.props.user.userName} - <a
            className="logoutLink color-secondary-2-2" onClick={this.logout}>Log Out
            </a>
        </p>
      </div>;
    } else {
      options = <ul>
      <li><Link className="color-secondary-2-2" to="/login">Login</Link></li>
      <li><Link className="color-secondary-2-2" to="/register">Register</Link></li>
    </ul>
    }

    return (
      <div className="loginStatus">
        {options}
      </div>
    )
  }
}

export default connect(mapStateToProps)(LoginStatus);