import React from 'react';
import PostComments from './post-comments';

/**
 * @description Blog's Post-footer component
 * @return Rendered HTML Blog's Post-footer;
 */

class PostFooter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="post-footer">
        <PostComments />
      </div>
    );
  }
}

module.exports = PostFooter;
