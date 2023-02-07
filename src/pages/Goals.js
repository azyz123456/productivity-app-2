//make category drop-down: you can add more categories 

import React, { useState, Fragment } from "react";
import DropdownMenu from "./DropdownMenu";

const data = [
  { goal: "Get in shape", category: "Health", time: "Long-Term", isEditing: false},
  { goal: "Get A in CIS 1200", category: "School", time: "Short-Term", isEditing: false},
];

export default function Goals() {
    const Progress = ({done}) => {
        const [style, setStyle] = React.useState({});
        setTimeout(() => {
            const newStyle = {
                opacity: 1,
                width: `${done}%`
            }
            
            setStyle(newStyle);
        }, 200);
        
        return (
            <div className="progress">
                <div className="progress-done" style={style}>
                    {done}%
                </div>
            </div>
        )
    }

  const [rows, setRows] = useState(data);
  const [newRow, setNewRow] = useState({
    goal: '',
    category: '',
    time: '',
    isEditing: false
  });
  const [editedRow, setEditedRow] = useState({
    goal: '',
    category: '',
    time: '',
    isEditing: false,
  });

  function handleFormChange(e) {
    e.preventDefault();
    const fieldName = e.target.getAttribute('name');
    const newFormData = {...newRow};
    newFormData[fieldName] = e.target.value;
    setNewRow(newFormData);
  }

  function handleRowChange(e) {
    e.preventDefault();
    const fieldName = e.target.getAttribute('name');
    const newRowData = {...editedRow};
    newRowData[fieldName] = e.target.value;
    setEditedRow(newRowData);
  }

  function handleSubmitNewRow(e) {
    e.preventDefault();
    setRows([
      ...rows,
      newRow
    ]);
    setNewRow({
      goal: '',
      category: '',
      time: '',
      isEditing: false
    });
  }

  function readOnlyRow(val, key) { 
    /*return (
       <tr key={key}>
          <td>{val.goal}</td>
          <td>{val.category}</td>
          <td>{val.time}</td>
          <td><Progress done="70"/></td>
          <td>
            <button className="table-button" onClick={(e) => toggleEdit(e, val)}>Edit</button>
            <button className="table-button" onClick={e => handleDelete(e, val)}>Delete</button>
          </td>
       </tr>)*/
       return (
        <tr key={key}>
           <td>{val.goal}</td>
           <td><DropdownMenu/></td>
           <td>{val.time}</td>
           <td><Progress done="70"/></td>
           <td>
             <button className="table-button" onClick={(e) => toggleEdit(e, val)}>Edit</button>
             <button className="table-button" onClick={e => handleDelete(e, val)}>Delete</button>
           </td>
        </tr>)
  }

  function handleDelete(e, val) {
    e.preventDefault();
    const nextRows = rows.filter(row => row !== val);
    setRows(nextRows);
  }

  function toggleEdit(e, val) {
    e.preventDefault();
    const nextRows = rows.map(row =>
      {
        if (row === val) {
          return {
            ...row,
            isEditing: !(row.isEditing),
          }
      } else {
        return row;
      }
      }
    );
    setRows(nextRows);
  }

  function editableRow() {
    return (
      <tr>
        <td>
          <input
            type="text"
            required="required"
            placeholder="Goal"
            name="goal"
            onChange={handleRowChange}
            value={editedRow.goal}
            >
          </input>
        </td>
        <td>
          <input
            type="text"
            required="required"
            placeholder="Category"
            name="category"
            onChange={handleRowChange}
            value={editedRow.category}
            >
          </input>
        </td>
        <td>
          <input
            type="text"
            required="required"
            placeholder="Time Frame"
            name="time"
            onChange={handleRowChange}
            value={editedRow.time}>
          </input>
        </td>
        <td><Progress done="70"/></td>
        <td>
            <button>Save</button>
            <button>Delete</button>
          </td>
      </tr>
    )
  }

  function handleSubmitEdit(e) {
    e.preventDefault();
    let prevTime = '';
    let prevCategory = null;
    let goal = null;
    const nextRows = rows.map( row => {
      if (row.isEditing) {
        prevTime = row.time;
        prevCategory = row.category;
        goal = row.goal;
        return {
          ...row,
          goal: editedRow.goal,
          category: editedRow.category,
          time: editedRow.time,
          isEditing: false,
        }
      } else {
        return row;
      }
    }
    );
    
    setRows(nextRows);
    setEditedRow({});
  }

  return (
    <>
   <div className="Goals">
      <h1>Goals Tracker</h1>
      <form onSubmit={handleSubmitEdit}>
        <table>
          <thead>
            <tr>
              <th>Goal</th>
              <th>Category</th>
              <th>Time Frame</th>
              <th>Progress</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((val, key) => {
              return (
                <Fragment>
                  {val.isEditing ? editableRow() : readOnlyRow(val, key)}
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </form>
      <h2>Add a Goal</h2>
      <form onSubmit={handleSubmitNewRow}>
        <input
          className="screen-time-input"
          type="text"
          name="goal"
          required="required"
          placeholder="Enter Goal Name"
          onChange={handleFormChange}
          value={newRow.goal}
        />
        <input
          className="screen-time-input"
          type="text"
          name="category"
          required="required"
          placeholder="Enter category"
          onChange={handleFormChange}
          value={newRow.category}
        />
        <input
          className="screen-time-input"
          type="text"
          name="time"
          required="required"
          placeholder="Enter time frame"
          onChange={handleFormChange}
          value={newRow.time}
        />
        <button className="table-button" type="submit">Add</button>
      </form>
      <div>
      </div>
    </div>
    </>
  );
}
