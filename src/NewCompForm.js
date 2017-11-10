import React, { Component } from 'react';

class NewCompForm extends Component {

  render() {
    const {
      newName,
      extractCompNames,
      handleInputChange,
      handleSelectChange,
      handleSubmit,
      components,
      exportFiles
    } = this.props

    // Creates an option element in dropdown menu for each component name in state.
    const componentNames = extractCompNames(components)
    const parents = componentNames.map((parent, index) => {
      return <option key={index} value={parent}>
        {parent}
      </option>
    })

    return (
      <div>
        <h1>Create a new component</h1>

        <form className="form">
          Name
        <input
            placeholder="Component Name"

            type='text'
            name='name'
            value={newName}
            onChange={handleInputChange}
          />
          <br />
          Parent
          <select
            name='parent'
            onChange={handleSelectChange}
            >
            <option value='-'>-</option>
            {parents}
          </select>
          <br />
          <input
            type='submit'
            value='Add Component'
            onClick={handleSubmit}
          />
          
          <br />
          <br />
          <br />
          <br /> 
          <br />
          <br />
          <br />
          <br />

          <button className="export" onClick={exportFiles}>Export </button>
        </form>
    </div>
  );
}

}

export default NewCompForm;
