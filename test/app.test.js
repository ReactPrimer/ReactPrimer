import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render } from 'enzyme';
import sinon from 'sinon';

import App from '../src/App';
import NewCompForm from '../src/NewCompForm';
import SortableTree from 'react-sortable-tree'
const IPC = require('electron').ipcRenderer;

describe('<App />',() => {
  let component;
  beforeEach(()=> {
    component = shallow(<App />);
  })
  it('renders an App component', () => {
    expect(component).toHaveLength(1);
  })
  it('renders a NewCompForm component', () => {
    expect(component.find(NewCompForm)).toHaveLength(1);
  })
  it('a tree is rendered', () => {
    expect(component.find(SortableTree)).toHaveLength(1);
  })

  it('expects correct array of comp names', () => {
    const comp = [{title:'Test1',children:[{title:'Test2',children:[]},{title:'Test3',children:[]}]}]
    expect(component.instance().extractCompNames(comp)).toEqual(['Test1','Test2','Test3']);
  })
  it('input validation- correct casing', ()=> {
    expect(component.instance().formatName('big dog banana monkey')).toEqual('BigDogBananaMonkey');
  })
  it('input validation- correct casing', ()=> {
    expect(component.instance().formatName('this is amazing')).toEqual('ThisIsAmazing');
  })
  it('input validation- correct spacing', ()=> {
    expect(component.instance().formatName('banana')).toEqual('Banana')
  })
})

/*
   (maybe needs spectrum) check if export button sends message to backend

  check if parent data is appended to drop down
  check if correct name data gets added to the correct place in state object
  check if parent data is appended to drop down
  check if add component button sends name info to state
  check if form data was correctly sent
  */
