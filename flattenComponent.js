// functionality to flatten component tree data structure.

function flattenComponent(components, flattened = []) {
  components.forEach((element, index) => {
    let obj = {};
    obj['title'] = element.title;
    obj['children'] = element.children;
    flattened.push(obj);
    flattenComponent(components[index].children, flattened);
  })
  return flattened;
}

module.exports = flattenComponent
