import * as React from "react";
import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { loadRepo, loadStargazers } from "../actions";
import Repo from "../components/Repo";
import User from "../components/User";
import List from "../components/List";

function loadData(props: RepoPageProps) {
  const { fullName } = props;
  props.loadRepo(fullName, [ "description" ]);
  props.loadStargazers(fullName);
}

interface RepoPageProps {
  repo?: {
    name: string;
    description?: string;
  };
  fullName: string;
  name: string;
  owner?: {
    login: string;
  };
  stargazers: Array<any>;
  stargazersPagination?: {};
  loadRepo(fullName: string, requiredFields: any): any;
  loadStargazers(fullName: string, nextPage?: any): any;
}

interface UserProps {
  login: string;
  avatarUrl: string;
  name?: string;
}

class RepoPage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.renderUser = this.renderUser.bind(this);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps: RepoPageProps) {
    if (nextProps.fullName !== this.props.fullName) {
      loadData(nextProps);
    }
  }

  handleLoadMoreClick() {
    this.props.loadStargazers(this.props.fullName, true);
  }

  renderUser(user: UserProps) {
    return (
      <User user={user}
            key={user.login} />
    );
  }

  render() {
    const { repo, owner, name } = this.props;
    if (!repo || !owner) {
      return <h1><i>Loading {name} details...</i></h1>;
    }

    const { stargazers, stargazersPagination } = this.props;
    return (
      <div>
        <Repo repo={repo}
              owner={owner} />
        <hr />
        <List renderItem={this.renderUser}
              items={stargazers}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading stargazers of ${name}...`}
              {...stargazersPagination} />
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  // We need to lower case the login/name due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.params.login.toLowerCase();
  const name = ownProps.params.name.toLowerCase();

  const {
    pagination: { stargazersByRepo },
    entities: { users, repos }
  } = state;

  const fullName = `${login}/${name}`;
  const stargazersPagination = stargazersByRepo[fullName] || { ids: [] };
  const stargazers = stargazersPagination.ids.map((id: any) => users[id]);

  return {
    fullName,
    name,
    stargazers,
    stargazersPagination,
    repo: repos[fullName],
    owner: users[login]
  };
}

export default connect(mapStateToProps, {
  loadRepo,
  loadStargazers
})(RepoPage);
