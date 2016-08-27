import * as React from "react";
import { Component, PropTypes } from "react";
import { Link } from "react-router";

interface RepoProps {
  repo: {
    name: string;
    description?: string;
  };
  owner: {
    login: string;
  };
}

export default class Repo extends Component<RepoProps, any> {

  render() {
    const { repo, owner } = this.props;
    const { login } = owner;
    const { name, description } = repo;

    return (
      <div className="Repo">
        <h3>
          <Link to={`/${login}/${name}`}>
            {name}
          </Link>
          {" by "}
          <Link to={`/${login}`}>
            {login}
          </Link>
        </h3>
        {description &&
          <p>{description}</p>
        }
      </div>
    );
  }
}
