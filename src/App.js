import React, { Component } from 'react';
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
          {
            title: 'Value1',
            expanded: true,
            children: [{ title: 'Value1a', expanded: false, children: [] }]
          },
          {
            title: 'Value2',
            expanded: false,
            children: []
          },
          {
            title: 'Value3',
            expanded: true,
            children: [
              {
                title: 'Value3A',
                expanded: false,
                children: []
              },
              {
                title: 'Value3B',
                expanded: true,
                children: []
              },
              {
                title: 'Value3C',
                expanded: false,
                children: []
              },
              {
                title: 'Value3D',
                expanded: false,
                children: []
              }
            ]
          }
        ]
      }],
      components: [
        {
          name: 'App',
          child: []
        }
      ],
      newName: '',
      newParent: ''
    };
    this.flattenComp = this.flattenComp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.exportFiles = this.exportFiles.bind(this);
  }

  flattenComp(components, flattened = []) {
    components.forEach((element,index) => {
      let obj = {};
      obj['title'] = element.title;
      // obj['children'] = element.children;
      flattened.push(obj);
      this.flattenComp(components[index].children,flattened);
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

  // Submits form data and updates state with new component details.
  // handleSubmit(e) {
  //   e.preventDefault()
  //   const newName = this.state.newName
  //   const parent = this.state.newParent;
  //   const comp = this.state.components.slice();
  //   if (newName === '') {
  //     alert('Please enter a component name.')
  //   } else if (parent === '') {
  //     alert('Please select a parent component.')
  //   } else {
  //     for (let i = 0; i < comp.length; i += 1) {
  //       if (comp[i].name === parent) {
  //         comp[i].child.push(newName)
  //         break
  //       }
  //     }
  //     comp.push({
  //       name: newName,
  //       child: []
  //     })
  //     this.setState({ components: comp })
  //   }
  // }

  searchTreeData(data, target) {
    for(let i = 0; i < data.length; i += 1) {
      console.log('i: ', i, '; data: ', data[i]);
      let title = data[i].title
      if (title === target) {
        console.log('Title: ', title, 'Name: ', target)
      }
      if (data[i].children) {
        searchTreeData(data[i].children, target);
      }
    }
  };

  handleSubmit(e) {
    e.preventDefault()
    const newName = this.state.newName
    const parent = this.state.newParent;
    const comp = this.state.treeData.slice();
    if (newName === '') {
      alert('Please enter a component name.')
    } else if (parent === '') {
      alert('Please select a parent component.')
    } else {
      for (let i = 0; i < comp.length; i += 1) {
        if (comp[i].name === parent) {
          comp[i].child.push(newName)
          break
        }
      }
      comp.push({
        name: newName,
        child: []
      })
      this.setState({ components: comp })
    }
  }

  exportFiles() {
    //function for sending data to Electron server
    IPC.send('componentTree', this.state.components);

  }

  render() {
    return (
      <div>
        <h1>ReactPrimer</h1>
        <NewCompForm
          newName={this.state.newName}
          newParent={this.props.newParent}
          flattenComp={this.flattenComp}
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
