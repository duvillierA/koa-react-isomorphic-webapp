import React from 'react';

class PostDate extends React.Component {
  render() {
    return <span className="post-date">{this.props.date}</span>;
  }
}

export default PostDate;
