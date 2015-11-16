import React from 'react';
import PostHeader from './post-header';
import PostFooter from './post-footer';

/**
 * @description Blog's Post component
 * @param text {string}
 * @param title {string}
 * @param author {string}
 * @param createdDate {date}
 * @return Rendered HTML Blog's Post;
 */

class Post extends React.Component {
  constructor(props) {
    super(props);

    let post = props.post;
    this.state = {
      text: post.text,
      title: post.title,
      uri: post.uri,
      author: post.author,
      createdDate: post.createdDate
    };
  }
  render() {
    return (
      <article className="post">
        <PostHeader title={this.state.title}
                    uri={this.state.uri}
                    author={this.state.author}
                    createdDate={this.state.createdDate}/>
        <div dangerouslySetInnerHTML={{__html: this.state.text}} />
        <PostFooter />
      </article>
    );
  }
}

module.exports = Post;
