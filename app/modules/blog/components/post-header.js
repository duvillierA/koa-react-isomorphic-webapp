import React from 'react';
import PostTitle from './post-title';
import PostDate from './post-date';
import PostAuthor from './post-author';

/**
 * @description Blog's Post-header component
 * @param title {string}
 * @param uri {string}
 * @param author {string}
 * @param createdDate {date}
 * @return Rendered HTML Blog's Post-header;
 */

class PostHeader extends React.Component {
  render() {
    return (
      <div className="post-header">
        <PostTitle title={this.props.title} uri={this.props.uri} />
        <PostAuthor author={this.props.author} />, <PostDate date={this.props.createdDate} />
      </div>
    );
  }
}

module.exports = PostHeader;
