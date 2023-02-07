//go back to management and see how you can use a framework to improve your productivity app
//make page for goals: use a table, long-term/short-term, goal type, progress based on number of tasks done - Notion table
//go back to your to-do list and associate each task with a goal
//create a priority tag for each task
//add a calendar

import React, { useState, Fragment } from "react";
import {Doughnut} from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const data = [
  { name: "Instagram", time: 45, max: 90, isEditing: false},
  { name: "Tiktok", time: 50, max: 60, isEditing: false},
  { name: "Facebook", time: 30, max: 90, isEditing: false}
];

export default function ScreenTime() {
  const [rows, setRows] = useState(data);
  let graphLabels = [];
  let graphData = [];
  for (let i=0; i<rows.length; i++) {
    graphLabels.push(rows[i].name);
    graphData.push(rows[i].time);
  }
  const state = {
    labels: graphLabels,
    datasets: [
      {
        data: graphData,
      }
    ]
  }

  const [newRow, setNewRow] = useState({
    name: '',
    time: '',
    max: '',
    isEditing: false
  });
  const [editedRow, setEditedRow] = useState({
    time: '',
    max: '',
  });
  const [totalTime, setTotalTime] = useState(
    {
      time: 125,
      max: 240,
    }
  );
  const [warning, setWarning] = useState([]);

  function printWarning() {
    if (warning.length === 0) {
      return "Your screen time is currently within limits.";
    } else if (warning.length === 1) {
      return "Your screen time for " + warning[0] + " is over the limit.";
    } else if (warning.length === 2) {
      return "Your screen time for " + warning[0] + " and " + warning[1] + " is over the limit.";
    }
    
    {
      let str = "Your screen time for ";
      for (let i=0; i<warning.length-1; i++) {
        str += warning[i] + ", ";
      }
      str += "and " + warning[warning.length-1]
      str += " is over the limit."
      return str;
    }
  }

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
    if (newRow.time > newRow.max) {
      setWarning([
        ...warning,
        newRow.name,
      ]);
    }
    console.log(warning);
    setRows([
      ...rows,
      newRow
    ]);
    setTotalTime(
      {
        time: totalTime.time + parseInt(newRow.time),
        max: totalTime.max + parseInt(newRow.max),
      }
    );
    setNewRow({
      name: '',
      time: '',
      max: '',
      isEditing: false
    });
  }

  function readOnlyRow(val, key) { 
    return (
       <tr key={key}>
          <td>{val.name}</td>
          <td>{val.time}</td>
          <td>{val.max}</td>
          <td>
            <button className="table-button" onClick={(e) => toggleEdit(e, val)}>Edit</button>
            <button className="table-button" onClick={e => handleDelete(e, val)}>Delete</button>
          </td>
       </tr>)
  }

  function handleDelete(e, val) {
    e.preventDefault();
    console.log(val.name);
    if (val.time > val.max) {
      const nextWarning = warning.filter(w => w !== val.name);
      console.log(warning, nextWarning);
      setWarning(nextWarning);
    }
    setTotalTime(
      {
        time: totalTime.time - parseInt(val.time),
        max: totalTime.max - parseInt(val.max),
      }
    );
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

  function editableRow(name) {
    return (
      <tr>
        <td>
          {name}
        </td>
          <input
            type="text"
            required="required"
            placeholder="Time"
            name="time"
            onChange={handleRowChange}
            value={editedRow.time}
            >
          </input>
        <td>
          <input
            type="text"
            required="required"
            placeholder="Max"
            name="max"
            onChange={handleRowChange}
            value={editedRow.max}>
          </input>
        </td>
        <td>
        <td>
            <button>Save</button>
            <button>Delete</button>
          </td>
        </td>
      </tr>
    )
  }

  function handleSubmitEdit(e) {
    e.preventDefault();
    let prevTime = 0;
    let prevMax = 0;
    let name = null;
    const nextRows = rows.map( row => {
      if (row.isEditing) {
        prevTime = parseInt(row.time);
        prevMax = parseInt(row.max);
        name = row.name;
        return {
          ...row,
          time: editedRow.time,
          max: editedRow.max,
          isEditing: false,
        }
      } else {
        return row;
      }
    }
    );
    console.log("name: ", name);
    
    if (editedRow.time > editedRow.max && prevTime <= prevMax) {
      //add warning for this app
      setWarning([
        ...warning,
        name,
      ])
    } else if (editedRow.time <= editedRow.max && prevTime > prevMax) {
      //delete warning for this app
        const nextWarning = warning.filter(w => w !== name);
        setWarning(nextWarning);
    }
    console.log(warning);
    setRows(nextRows);
    setEditedRow({});
    setTotalTime(
      {
        time: totalTime.time - prevTime + parseInt(editedRow.time), 
        max: totalTime.max - prevMax + parseInt(editedRow.max)
      }
    );
    //update total
  }

  return (
    <>
   <div className="App">
      <h1>Screen Time Tracker</h1>
      <form onSubmit={handleSubmitEdit}>
        <table>
          <thead>
            <tr>
              <th>App</th>
              <th>Screen Time (min)</th>
              <th>Max. Screen Time (min)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((val, key) => {
              return (
                <Fragment>
                  {val.isEditing ? editableRow(val.name) : readOnlyRow(val, key)}
                </Fragment>
              )
            })}
            <tr className="bold">
              <td>
                Total
              </td>
              <td>
                {totalTime.time}
              </td>
              <td>
                {totalTime.max}
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <h2>Add an App</h2>
      <form onSubmit={handleSubmitNewRow}>
        <input
          className="screen-time-input"
          type="text"
          name="name"
          required="required"
          placeholder="Enter App Name"
          onChange={handleFormChange}
          value={newRow.name}
        />
        <input
          className="screen-time-input"
          type="text"
          name="time"
          required="required"
          placeholder="Enter time"
          onChange={handleFormChange}
          value={newRow.time}
        />
        <input
          className="screen-time-input"
          type="text"
          name="max"
          required="required"
          placeholder="Enter max time"
          onChange={handleFormChange}
          value={newRow.max}
        />
        <button className="table-button" type="submit">Add</button>
      </form>
      <h5 className={warning.length===0 ? "green" : "red"}>{printWarning()}</h5>
      <h2>Current Screen Time Breakdown</h2>
      <div>
        <Doughnut
            data={state}
            options={{
              title:{
                display:true,
                text:'Average Rainfall per month',
                fontSize:20
              },
              legend:{
                display:true,
                position:'right'
              }
            }}
          />
      </div>
    </div>
    </>
  );
}
