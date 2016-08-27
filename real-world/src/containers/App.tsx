import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import Explore from "../components/Explore";
import { resetErrorMessage } from "../actions";

interface AppProps {
  // Injected by React Redux
  errorMessage: string;
  resetErrorMessage(): any;
  inputValue: string;
  // Injected by React Router
  children?: any;
}

class App extends Component<AppProps, any> {
  constructor(props: AppProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
  }

  handleDismissClick(e: any) {
    this.props.resetErrorMessage();
    e.preventDefault();
  }

  handleChange(nextValue: any) {
    browserHistory.push(`/${nextValue}`);
  }

  renderErrorMessage() {
    const { errorMessage } = this.props;
    if (!errorMessage) {
      return null;
    }

    return (
      <p style={{ backgroundColor: "#e99", padding: 10 }}>
        <b>{errorMessage}</b>
        {" "}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    );
  }

  render() {
    const { children, inputValue } = this.props;
    return (
      <div>
        <Explore value={inputValue}
                 onChange={this.handleChange} />
        <hr />
        {this.renderErrorMessage()}
        {children}
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    errorMessage: state.errorMessage,
    inputValue: ownProps.location.pathname.substring(1)
  };
}

export default connect(mapStateToProps, {
  resetErrorMessage
})(App);
