import React from 'react';

class PostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null
    };
  }
  componentWillMount() {
    // fetch Discuss api
  }
  render() {
    return (
      <div className="post-comments">
      {this.state.isLoading ? 'loading comments...' : ''}
      </div>
    );
  }
}

export default PostComments;
