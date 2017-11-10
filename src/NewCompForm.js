import React, { Component } from 'react';


class NewCompForm extends Component {

  render() {
    const {
      newName,
      extractCompNames,
      handleInputChange,
      handleSelectChange,
      handleSubmit,
      components
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
          <form>
            Name:<br />
          <input
            type='text'
            name='name'
            value={newName}
            onChange={handleInputChange}
            />
          <br />
          Parent:
          <br />
          <select
            name='parent'
            onChange={handleSelectChange}
            >
            <option value='-'>-</option>
            {parents}
          </select>
          <br />
          <br />
          <input
            type='submit'
            value='Add Component'
            onClick={handleSubmit}
            />
        </form>
    </div>
  );
}
}

export default NewCompForm;
