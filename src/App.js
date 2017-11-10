import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortableTree, { removeNodeAtPath } from 'react-sortable-tree';
import NewCompForm from './NewCompForm';

const IPC = require('electron').ipcRenderer;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [{
        title: 'App',
        expanded: true,
        children: [
          {
            title: 'Navigation',
            expanded: true,
            children: [
              {
                title: 'Link',
                expanded: true,
                children: []
              },
              {
                title: 'Link',
                expanded: true,
                children: []
              },
              {
                title: 'Link',
                expanded: true,
                children: []
              }
            ]
          },
          {
            title: 'SideBar',
            expanded: true,
            children: []
          },
          {
            title: 'Products',
            expanded: true,
            children: [
              {
                title: 'Product',
                expanded: true,
                children: []
              }
            ]
          }
        ]
      }],
      newName: '',
      newParent: '-'
    };
    this.extractCompNames = this.extractCompNames.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.formatName = this.formatName.bind(this);
    this.searchTreeData = this.searchTreeData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.exportFiles = this.exportFiles.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //     const vitalStateChange = this.state.treeData !== nextState.treeData;
  //     return vitalStateChange;
  // }

  // Helper function creates an array of all component names
  extractCompNames(components, flattened = [], cache = {}) {
    components.forEach((element, index) => {
      let name = 
        element.title
        // .toUpperCase()
      if (!cache[name]) {
        cache[name] = true;
        flattened.push(element.title);
        this.extractCompNames(components[index].children, flattened, cache);
      }
    })
    return flattened;
  }

  // Updates a placeholder in state with text input value.
  handleInputChange(e) {
    this.setState({ newName: e.target.value })
  }

  // Updates a placeholder in state with selected value.
  handleSelectChange(e) {
    this.setState({ newParent: e.target.value })
  }

  // Formats casing and spacing, and removes file extenions from input
  formatName(userInput) {
    let result = userInput
      .replace(/^./g, x => x.toUpperCase())
      //.charAt(0).toUpperCase() + userInput.slice(1)
      .replace(/\ \w/g, x => x[1].toUpperCase())
      .replace(/\..+$/, '');
    return result
  }

  // Helper function finds parent in state, and update with new child element
  searchTreeData(data, target, newName) {
    let formattedName = this.formatName(newName)
    // if tree is empty, create first component at top-level
    for (let i = 0; i < data.length; i += 1) {
      // console.log('i: ', i, '; data: ', data[i]);
      let title = data[i].title
      if (title === target) {
        data[i].children.push({
          title: formattedName,
          expanded: true,
          children: []
        })
      }
      if (data[i].children) {
        this.searchTreeData(data[i].children, target, newName);
      }
    };
  }

  // Submits form data and updates state with new component details.
  handleSubmit(e) {
    e.preventDefault()
    const newName = this.state.newName
    const newParent = this.state.newParent
    const target = this.state.newParent;
    const tree = this.state.treeData.slice();
    if (newName === '') {
      alert('Please enter a component name.')
    }
    else if (newParent === '-' || tree.length === 0) {
      tree.push({
        title: this.formatName(newName),
        expanded: true,
        children: []
      })
      this.setState({ treeData: tree })
    }
    else {
      this.searchTreeData(tree, target, newName)
      this.setState({ treeData: tree })
    }
    this.setState({ newName: '' })
  }


//function for sending data to Electron server
exportFiles() {
  IPC.send('componentTree', this.state.treeData);
}

render() {
  console.log("Page rendered.")

  // Nodekey used to identify node to be removed.
  const getNodeKey = ({ treeIndex }) => treeIndex;

  return (
    <div>
      <h1>ReactPrimer</h1>
      <NewCompForm
        newName={this.state.newName}
        newParent={this.state.newParent}
        extractCompNames={this.extractCompNames}
        handleInputChange={this.handleInputChange}
        handleSelectChange={this.handleSelectChange}
        handleSubmit={this.handleSubmit}
        components={this.state.treeData}
      />
      <br />
      <button onClick={this.exportFiles}>Export Components</button>
      <br />
      <br />
      <div style={{ height: 525 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          // button for removing component
          generateNodeProps={({ node, path }) => ({
            buttons: [
              <button onClick={() => this.setState(state => ({
                treeData: removeNodeAtPath({
                  treeData:
                  state.treeData,
                  path,
                  getNodeKey,
                }),
              }))}
              >X</button>,
            ],
          })}
        />
      </div>
    </div>
  );
}
}

export default App;
