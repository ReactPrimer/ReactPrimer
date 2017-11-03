import React, { Component } from 'react';


class NewCompForm extends Component {

  render() {
    const {
      newName,
      newParent,
      flattenComp,
      handleInputChange,
      handleSelectChange,
      handleSubmit,
      components
    } = this.props

    // Creates an option element in dropdown menu for each component name in state.
    const flattenedComponents = flattenComp(components)
    const parents = flattenedComponents.map((parent, index) => {
      return <option key={index} value={parent.title}>
        {parent.title}
      </option>
    })

    return (
      <div>
        <fieldset>
          <legend>Create a new component</legend>
          <form>
            Name:<br />
          <input
            type='text'
            name='name'
            onChange={handleInputChange}
            />
          <br />
          Parent:
          <br />
          <select
            name='parent'
            value={newParent}
            onChange={handleSelectChange}
            >
            <option />
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
      </fieldset>
    </div>
  );
}
}

export default NewCompForm;
