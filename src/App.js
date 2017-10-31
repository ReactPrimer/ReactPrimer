import React, { Component } from 'react';
const IPC = require('electron').ipcRenderer;


class App extends Component {
  constructor(props) {
    super(props);
    this.state={tree:"sample text"};
  }

  componentWillMount() {
//this sends this.state.tree to the back end
    IPC.send('treeInfo', this.state.tree);
  }

  render() {
    return (
      <div>
        <h1>Hello KVK</h1>
      </div>
    );
  }
}

export default App;
