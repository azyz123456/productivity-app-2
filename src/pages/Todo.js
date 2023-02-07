import React, { useState } from "react";

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');
    const [open, setOpen] = React.useState(false);
    const [priority, setPriority] = React.useState("Medium");

    const handleOpen = () => {
      setOpen(!open);
    };

    function handleSubmit(e) {
        e.preventDefault();//important
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
      }
      
    function handleChange(e) {
        setNewName(e.target.value);
      }

    function handleDropdownClick(name) {
      setPriority(name);
      setOpen(false);
    }
    //when form is submitted - save button clicked - props name should be changed 
    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="todo-label" htmlFor={props.id}>
              New name for {props.name}
            </label>
            <input
                id={props.id}
                className="todo-text"
                type="text"
                value={newName}
                onChange={handleChange}
            />
          </div>
          <div className="btn-group">
          <button
            type="button"
            className="btn todo-cancel"
            onClick={() => setEditing(false)}
            >
            Cancel
            <span className="visually-hidden">renaming {props.name}</span>
          </button>

            <button type="submit" className="btn btn__primary todo-edit">
              Save
              <span className="visually-hidden">new name for {props.name}</span>
            </button>
          </div>
        </form>
      );
      const viewTemplate = (
        <div className="stack-small">
          <div className="c-cb">
              <input
                id={props.id}
                type="checkbox"
                defaultChecked={props.completed}
                onChange={() => props.toggleTaskCompleted(props.id)}
              />
              <label className="todo-label" htmlFor={props.id}>
                {props.name}
              </label>
            </div>
            <div className="btn-group">
              <button
                type="button"
                className="btn"
                onClick={() => setEditing(true)}
              >
                  Edit <span className="visually-hidden">{props.name}</span>
              </button>

              <button
                type="button"
                className="btn btn__danger"
                onClick={() => props.deleteTask(props.id)}
              >
                Delete <span className="visually-hidden">{props.name}</span>
              </button>

              <div className={"dropdown " + priority}>
              <button
                  type="button"
                  className={"btn " + priority}
                  onClick={handleOpen}
                >
                  {priority} <span className="visually-hidden">{props.name}</span>
              </button> 
                {open ? (
                  <ul className="menu">
                    <li className="menu-item high">
                      <button onClick={()=>handleDropdownClick("High")}>High</button>
                    </li>
                    <li className="menu-item medium">
                      <button onClick={()=>handleDropdownClick("Medium")}>Medium</button>
                    </li>
                    <li className="menu-item low">
                      <button onClick={()=>handleDropdownClick("Low")}>Low</button>
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>
        </div>
      );
      
      return (
        <li className="todo">
          {isEditing ? editingTemplate : viewTemplate}
        </li>);

  }
  