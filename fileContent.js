//this function will return the component template to be populated in the project folder
function fileContent(component) {
  let content = "";

  content +="import React, { Component } from 'react';\n";

  for (let i = 0; i < component.children.length; i++)
    {
      content+=`import ${component.children[i].title} from './${component.children[i].title}.jsx'\n`;
    }

    content+=`\nclass ${component.title} extends Component {\n`;
    content+=`  render() {\n`;
    content+=`    return (\n`;
    content+=`      <div>\n`;

    for (let i = 0; i < component.children.length; i++)
    {
    content+=`        <${component.children[i].title} />\n`;
    }
    content+=`      </div>\n`;
    content+=`    );\n`;
    content+=`  };\n`;
    content+=`}\n`;
    content+=`export default ${component.title};`;

  return content;
}


module.exports = fileContent;
