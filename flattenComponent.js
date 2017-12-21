// @flow

// functionality to flatten component tree data structure.

function flattenComponent(components: Array<Object>, flattened: Array<Object> = []): Array<Object> {
  components.forEach((element: Object, index: number) => {
    let obj: Object = {};
    obj['title'] = element.title;
    obj['children'] = element.children;
    flattened.push(obj);
    flattenComponent(components[index].children, flattened);
  })
  return flattened;
}

module.exports = flattenComponent
