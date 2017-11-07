import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SortableTree from 'react-sortable-tree';
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
          // {
          //   title: 'Navigation',
          //   expanded: true,
          //   children: [
          //     {
          //       title: 'Link',
          //       expanded: true,
          //       children: []
          //     },
          //     {
          //       title: 'Link',
          //       expanded: true,
          //       children: []
          //     },
          //     {
          //       title: 'Link',
          //       expanded: true,
          //       children: []
          //     }
          //   ]
          // },
          // {
          //   title: 'SideBar',
          //   expanded: true,
          //   children: []
          // },
          // {
          //   title: 'Products',
          //   expanded: true,
          //   children: [
          //     {
          //       title: 'Product',
          //       expanded: true,
          //       children: []
          //     }
          //   ]
          // }
        ]
      }],
      newName: '',
      newParent: ''
    };
    this.extractCompNames = this.extractCompNames.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.formatName = this.formatName.bind(this);
    this.searchTreeData = this.searchTreeData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.exportFiles = this.exportFiles.bind(this);
  }
  // Helper function creates an array of all component names
  extractCompNames(components, flattened = []) {
    const cache = {};
    components.forEach((element,index) => {
      let obj = {};
      if (!cache[element.title]) {
        cache[element.title] = true;
        obj['title'] = element.title;
        flattened.push(obj);
        this.extractCompNames(components[index].children,flattened);
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
      .charAt(0).toUpperCase() + userInput.slice(1)
      .replace(/\ \w/g, x => x[1].toUpperCase())
      .replace(/\..+$/, '');
    return result
  }

  // Helper function finds parent in state, and update with new child element
  searchTreeData(data, target, newName) {
    let formattedName = this.formatName(newName)
    for(let i = 0; i < data.length; i += 1) {
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
    }
  };

  // Submits form data and updates state with new component details.
  handleSubmit(e) {
    e.preventDefault()
    const newName = this.state.newName
    const target = this.state.newParent;
    const tree = this.state.treeData.slice();
    if (newName === '') {
      alert('Please enter a component name.')
    } else if (target === '') {
      alert('Please select a parent component.')
    } else {
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
            />
        </div>
      </div>
    );
  }
}

export default App;
