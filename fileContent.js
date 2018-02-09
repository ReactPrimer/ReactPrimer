// @flow

//this function will return the component template to be populated in the project folder
function fileContent(component: Object): string {
  let content: string = "";
  const cache: Object = {};

  content += "import React, { Component } from 'react';\n";

  for (let i: number = 0; i < component.children.length; i++) {
    if (!cache[component.children[i].title]) {
      cache[component.children[i].title] = true;
      content += `import ${component.children[i].title} from './${component.children[i].title}.jsx'\n`;
    }
  }

  if(component.isStateful)  {
  content += `\nclass ${component.title} extends Component {`;
  content += `\n  constructor(props) {`;
  content += `\n    super(props)\n`;
  content += `  }\n`;
  }
  else
  content += `\nconst ${component.title} = props => {\n`;

  content += `  render() {\n`;
  content += `    return (\n`;
  content += `      <div>\n`;

  for (let i: number = 0; i < component.children.length; i++) {
    content += `        <${component.children[i].title} />\n`;
  }
  content += `      </div>\n`;
  content += `    );\n`;
  content += `  };\n`;
  content += `}\n`;
  content += `export default ${component.title};`;





  return content;
}


module.exports = fileContent;
