import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to React Primer</h1>
        <Link to='/home'><button>Start</button></Link>
      </div>
    );
  }
}

export default Home;