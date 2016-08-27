import * as React from "react";
import { Component, PropTypes } from "react";
import { Link } from "react-router";

interface UserProps {
  user: {
    login: string;
    avatarUrl: string;
    name?: string;
  };
}

export default class User extends Component<UserProps, any> {
  render() {
    const { login, avatarUrl, name } = this.props.user;

    return (
      <div className="User">
        <Link to={`/${login}`}>
          <img src={avatarUrl} width="72" height="72" />
          <h3>
            {login} {name && <span>({name})</span>}
          </h3>
        </Link>
      </div>
    );
  }
}
