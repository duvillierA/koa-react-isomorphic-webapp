import React from 'react';

var Hello = React.createClass({
    render: function() {
        return <div>Hello {this.props.module}</div>;
    }
});

React.render(<Hello module="todos" />, document.getElementById('main'));
