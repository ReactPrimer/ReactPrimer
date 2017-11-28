import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import flattenComponent from '../flattenComponent';

describe('flattenComponent',() => {
  it ('testing for correct flattened data 1', ()=>{
    let testerArray1=[];
    let nested1 = [{title:'Test1',children:[]},{title:'Test2',children:[]}];
    let flattenedArr = flattenComponent(nested1);
    flattenedArr.forEach(el => {
      testerArray1.push(el.title);
    })
    expect(testerArray1).toEqual( ['Test1','Test2']);
  })
  it ('testing for correct flattened data 2', ()=>{
    let testerArray2=[];
    let nested2 = [{title:'Test1',children:[{title:'Test2',children:[]}]}];
    let flattenedArr = flattenComponent(nested2);
    flattenedArr.forEach(el => {
        testerArray2.push(el.title);
    })
    expect(testerArray2).toEqual( ['Test1','Test2']);
  })
  it ('testing for correct flattened data 3', ()=>{
    let testerArray3=[];
    let nested3 = [{title:'Test1',children:[{title:'Test2',children:[]}]},{title:'Test3',children:[]}];
    let flattenedArr = flattenComponent(nested3);
    flattenedArr.forEach(el => {
        testerArray3.push(el.title);
    })
    expect(testerArray3).toEqual( ['Test1','Test2','Test3']);
  })
})
