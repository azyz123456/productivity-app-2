import React, { useState } from "react";

function DropdownMenu(props) {
  const [category, setCategory] = useState("Category");
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([
      "Health", "Education", "Social"
  ]);

  const categoriesList = categories.map(category => {
      return (
      <li className="menu-item">
        <button onClick={()=>handleDropdownClick(category)}>{category}</button>
      </li>
      )
  });

  function handleDropdownClick(name) {
    setCategory(name);
    setOpen(false);
  }

  function handleOpen() {
    //how to handle something that is open?
    setOpen(!open);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCategories([
      ...categories,
      newCategory,
    ]);
    setNewCategory("");
    setAdd(false);
  }

  function handleChange(e) {
    e.preventDefault();
    setNewCategory(e.target.value);
  }

  //generate input form
  const form = (visible) => {
    if (!visible) {
      return;
    } 
    return (
      <form onSubmit={handleSubmit}>
        <input
        placeholder="Category Name"
        onChange={handleChange}
        value={newCategory}
        >
        </input>
        <button type="submit">
          Add
        </button>
      </form>
    );
  }

  return (
      <div className={"dropdown " + category}>
              <button
                  type="button"
                  className={"btn " + category}
                  onClick={handleOpen}
                >
                  {category} <span className="visually-hidden">{props.name}</span>
              </button> 
                {open ? (
                  <ul className="menu">
                    {categoriesList}
                    <li className="menu-item low">
                      <button onClick={()=>setAdd(!add)}>+</button>
                    </li>
                    <li>
                      {add ? form(true) : form(false)}
                    </li>
                  </ul>
                ) : null}
      </div>
  );
}

export default DropdownMenu;
