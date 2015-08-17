import React from 'react';

class PostTitle extends React.Component {
  render() {
    return <h1 className="post-title"><a href={this.props.uri}>{this.props.title}</a></h1>;
  }
}
export default PostTitle;
