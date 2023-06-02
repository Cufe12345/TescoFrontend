import React, { useState, useEffect, useImperativeHandle } from "react";
import classes from "./Sort.module.css";
function Sort(props) {
  const [name, setName] = useState("all");

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
