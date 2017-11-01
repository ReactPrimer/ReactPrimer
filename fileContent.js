//this function will return the component template to be populated in the project folder
function fileContent(component) {
  let content = "";

  content +="import React, { Component } from 'react';\n";

  for (let i = 0; i < component.child.length; i++)
    {
      content+=`import ${component.child[i]} from './${component.child[i]}.jsx'\n`;
    }

    content+=`\nclass ${component.name} extends Component {\n`;
    content+=`  render() {\n`;
    content+=`    return (\n`;
    content+=`      <div>\n`;

    for (let i = 0; i < component.child.length; i++)
    {
    content+=`        <${component.child[i]} />\n`;
    }
    content+=`      </div>\n`;
    content+=`    );\n`;
    content+=`  };\n`;
    content+=`}\n`;
    content+=`export default ${component.name};`;

  return content;
}


module.exports = fileContent;
