import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = (reduxState) => ({user: reduxState.user})

class LoginStatus extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  render () {
    let options = <ul>
        <li><Link className="color-secondary-2-2" to="/login">Login</Link></li>
        <li><Link className="color-secondary-2-2" to="/register">Register</Link></li>
      </ul>
    if (this.props.user.userName !== null) {
      options = <p>Welcome back, {this.props.user.userName}</p>;
    }

    return (
      <div className="loginStatus">
        {options}
      </div>
    )
  }
}

export default connect(mapStateToProps)(LoginStatus);