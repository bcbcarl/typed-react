import * as React from "react";
import { Component, PropTypes } from "react";
import { Provider } from "react-redux";
import routes from "../routes";
import { Router } from "react-router";
import { ReactRouterReduxHistory } from "react-router-redux";

interface RootProps {
  store: Redux.Store<any>;
  history: ReactRouterReduxHistory;
}

export default class Root extends Component<RootProps, any> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}
