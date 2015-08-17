import React from 'react';
import {getJSON} from 'jquery';
import Post from './post';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: props.posts
    };
  }
  componentWillMount() {
    // if posts are fullfilled by the server
    let hasAlreadyPosts = (this.props.posts && this.props.posts.length);
    if (hasAlreadyPosts) return;
    // otherwise fetch them
    getJSON('/blog/posts', null)
    .then(result => {
      this.setState({posts: result.posts});
    }.bind(this));
  }
  render() {
    return (
      <section className="blog">
        {this.state.posts.map(post =>
          <Post post={post} key={post.id} />
        )}
      </section>
    );
  }
}

Blog.propTypes = { posts: React.PropTypes.array};
Blog.defaultProps = { posts: []};

export default Blog;
