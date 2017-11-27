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
      exportFiles,
      saveFile,
      openFile
    } = this.props

    // Creates an option element in dropdown menu for each component name in state.
    const componentNames = extractCompNames(components)
    const parents = componentNames.map((parent, index) => {
      return <option key={index} value={parent}>
        {parent}
      </option>
    })

    return (
      <div className='form-container'>
        <h1>Create a new component</h1>
        <div className='form'>
          <form>
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
          </form>
        </div>
        <div className='center-spacer' />
        <div className='button-container'>
          <button onClick={saveFile}>save</button>
          <button onClick={openFile}>open</button>
          <button className="export" onClick={exportFiles}>Export </button>
        </div>
      </div>
    );
  }
}

export default NewCompForm;
