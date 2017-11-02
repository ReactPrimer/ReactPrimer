function flattenComponent(components, flattened = []) {
  components.forEach((element,index) => {
    let obj = {};
    obj['title'] = element.title;
    obj['children'] = element.children;
    flattened.push(obj);
    flattenComponent(components[index].children,flattened);
  })
  return flattened;
}
// console.log(flattenComponent([{title:'a',children:[{title:'b',children:[{title:'c',children:[]}]}]},{title:'d', children:[{title:'e',children:[]}]}]))

module.exports = flattenComponent;


