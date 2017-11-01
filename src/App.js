import React, { Component } from 'react';
import NewCompForm from './NewCompForm';
const IPC = require('electron').ipcRenderer;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: "sample text",
      components: [
        {
          name: "App",
          child: ["Header", "Nav"]
        },
        {
          name: "Header",
          child: null
        },
        {
          name: "Nav",
          child: null
        }
      ],
      newComponent: {}
    };
  }

  addNewComponent() {

  }

  handleSubmit(e) {
    e.preventDefault()
    alert("The form was submitted.")
  }

  componentWillMount() {
    //this sends this.state.tree to the back end
    IPC.send('treeInfo', this.state.tree);
  }

  render() {
    return (
      <div>
        <h1>Hello KVK</h1>
        <NewCompForm
          handleSubmit={this.handleSubmit}
          components={this.state.components}
          />
      </div>
    );
  }
}

export default App;
