import * as React from "react";
import { Component, PropTypes } from "react";

const GITHUB_REPO = "https://github.com/reactjs/redux";

interface ExploreProps {
  value: string;
  onChange(x: any): any;
}

export default class Explore extends Component<ExploreProps, any> {
  refs: {
    [key: string]: any;
    input: any;
  };

  constructor(props: ExploreProps) {
    super(props);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleGoClick = this.handleGoClick.bind(this);
  }

  componentWillReceiveProps(nextProps: ExploreProps) {
    if (nextProps.value !== this.props.value) {
      this.setInputValue(nextProps.value);
    }
  }

  getInputValue() {
    return this.refs.input.value;
  }

  setInputValue(val: any) {
    // Generally mutating DOM is a bad idea in React components,
    // but doing this for a single uncontrolled field is less fuss
    // than making it controlled and maintaining a state for it.
    this.refs.input.value = val;
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      this.handleGoClick();
    }
  }

  handleGoClick() {
    this.props.onChange(this.getInputValue());
  }

  render() {
    return (
      <div>
        <p>Type a username or repo full name and hit 'Go':</p>
        <input size="45"
               ref="input"
               defaultValue={this.props.value}
               onKeyUp={this.handleKeyUp} />
        <button onClick={this.handleGoClick}>
          Go!
        </button>
        <p>
          Code on <a href={GITHUB_REPO} target="_blank">Github</a>.
        </p>
        <p>
          Move the DevTools with Ctrl+W or hide them with Ctrl+H.
        </p>
      </div>
    );
  }
}
