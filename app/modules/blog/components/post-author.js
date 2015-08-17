import React from 'react';

class PostAuthor extends React.Component {
  render() {
    return <cite className="post-author">{this.props.author}</cite>;
  }
}

export default PostAuthor;
