import React, { useState, useEffect, useImperativeHandle } from "react";
import classes from "./Sort.module.css";

/**
 * A component that displays the sort bar to sort the products by name
 * @param {*} props the props passed to the component ie the names of the people in the order
 * */
function Sort(props) {

  //Stores the name to sort by
  const [name, setName] = useState("all");

  //Handles the name being changed
  const handleNameChange = (e) => {
    setName(e.target.value);
    props.setName(e.target.value);

    props.setBasket(null);
  };

  return (
    <div className={classes.filterContainer}>
      <select
        className={classes.filter}
        value={name}
        onChange={handleNameChange}
      >
        <option value="all">all</option>
        {props.names.map((user) => (
          <option value={user}>{user}</option>
        ))}
      </select>
    </div>
  );
}
export default Sort;
