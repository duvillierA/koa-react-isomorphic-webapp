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
  static propTypes = { posts: React.PropTypes.array }
  static defaultProps = { posts: []}
  componentWillMount() {
    // if posts are fullfilled by the server
    let hasAlreadyPosts = (this.props.posts && this.props.posts.length);
    if (hasAlreadyPosts) return;
    this.loadContentFromServer();
  }
  loadContentFromServer() {
    getJSON(this.props.url, null)
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

export default Blog;
