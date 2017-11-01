import React, { Component } from 'react';


class NewCompForm extends Component {
  render() {
    const parents = this.props.components.map((parent) => {
                  return <option value={parent.name}>
                    {parent.name}
                  </option>
                })

    return (
      <div>
        <fieldset>
          <legend>Create a new component</legend>
          <form>
            <br />
            Name:<br />
            <input type="text" name="name" /><br />
            Parent:<br />
          <select name="parent">
            {parents}
            </select>
            <br />
            <br />
            <input type="submit" value="Add Component" onClick={this.props.handleSubmit}/>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default NewCompForm;
