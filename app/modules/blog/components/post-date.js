import React from 'react';
import moment from 'moment';

class PostDate extends React.Component {
  render() {
    return <span className="post-date">{moment(this.props.date).fromNow(true)}</span>;
  }
}

module.exports = PostDate;
