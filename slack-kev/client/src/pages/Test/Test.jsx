import React, { Component } from 'react';

class Test extends Component {
  render () {
    const { increment, decrement } = this.props.actions;
    return (
      <div>
        <div>{ this.props.counter }</div>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    )
  }
}

export default Test;
