import * as React from "react";
import { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { loadUser, loadStarred } from "../actions";
import User from "../components/User";
import Repo from "../components/Repo";
import List from "../components/List";
import { zip } from "lodash";

function loadData(props: UserPageProps) {
  const { login } = props;
  props.loadUser(login, [ "name" ]);
  props.loadStarred(login);
}

interface UserPageProps {
  login: string;
  user?: {
    login: string;
    avatarUrl: string;
    name?: string;
  };
  starredPagination?: any;
  starredRepos: Array<any>;
  starredRepoOwners: Array<any>;
  loadUser: Function;
  loadStarred: Function;
}

class UserPage extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.renderRepo = this.renderRepo.bind(this);
    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  componentWillReceiveProps(nextProps: UserPageProps) {
    if (nextProps.login !== this.props.login) {
      loadData(nextProps);
    }
  }

  handleLoadMoreClick() {
    this.props.loadStarred(this.props.login, true);
  }

  renderRepo([ repo, owner ]) {
    return (
      <Repo repo={repo}
            owner={owner}
            key={repo.fullName} />
    );
  }

  render() {
    const { user, login } = this.props;
    if (!user) {
      return <h1><i>Loading {login}'s profile...</i></h1>;
    }

    const { starredRepos, starredRepoOwners, starredPagination } = this.props;
    return (
      <div>
        <User user={user} />
        <hr />
        <List renderItem={this.renderRepo}
              items={zip(starredRepos, starredRepoOwners)}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading ${login}'s starred...`}
              {...starredPagination} />
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  // We need to lower case the login due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const login = ownProps.params.login.toLowerCase();

  const {
    pagination: { starredByUser },
    entities: { users, repos }
  } = state;

  const starredPagination = starredByUser[login] || { ids: [] };
  const starredRepos = starredPagination.ids.map((id: any) => repos[id]);
  const starredRepoOwners = starredRepos.map((repo: any) => users[repo.owner]);

  return {
    login,
    starredRepos,
    starredRepoOwners,
    starredPagination,
    user: users[login]
  };
}

export default connect(mapStateToProps, {
  loadUser,
  loadStarred
})(UserPage);
