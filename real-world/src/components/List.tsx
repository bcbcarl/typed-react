import * as React from "react";
import { Component, PropTypes } from "react";

interface ListProps {
  loadingLabel: string;
  pageCount?: number;
  renderItem(user: any): JSX.Element;
  items: Array<any>;
  isFetching?: boolean;
  onLoadMoreClick(): any;
  nextPageUrl?: string;
}

export default class List extends Component<ListProps, any> {
  public static defaultProps = {
    isFetching: true,
    loadingLabel: "Loading..."
  };

  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props;
    return (
      <button style={{ fontSize: "150%" }}
              onClick={onLoadMoreClick}
              disabled={isFetching}>
        {isFetching ? "Loading..." : "Load More"}
      </button>
    );
  }

  render() {
    const {
      isFetching, nextPageUrl, pageCount,
      items, renderItem, loadingLabel
    } = this.props;

    const isEmpty = items.length === 0;
    if (isEmpty && isFetching) {
      return <h2><i>{loadingLabel}</i></h2>;
    }

    const isLastPage = !nextPageUrl;
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>;
    }

    return (
      <div>
        {items.map(renderItem)}
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    );
  }
}
