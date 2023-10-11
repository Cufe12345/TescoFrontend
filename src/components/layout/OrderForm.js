import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import classes from "./OrderForm.module.css";
import { Button } from "react-bootstrap";
import { NetworkContext } from "../../App";
import { useContext } from "react";

/**
 * A component that displays the add order card
 * */
function OrderForm() {

  //Stores the date to add
  const [date, setDate] = useState();

  //Stores the message to display if the order was added or not
  const [message, setMessage] = useState({ result: -1, message: "null" });

  //Network context
  const ip = useContext(NetworkContext);

  /**
   * Adds the order to the database by sending a request to the backend
   * */
  function AddOrder() {
    console.log(date);
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        type: "ADD_ORDER",
        value: date,
      }),
    };
    fetch(ip, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.Result == 0) {
          setMessage({ result: 1, message: "Added" });
        } else {
          setMessage({ result: 0, message: "Something went wrong" });
        }
      });
  }

  //Handles the date being changed
  const handleChange = (e) => {
    setDate(e.target.value);
  };
  return (
    <div>
      <Card style={{ width: "18rem", height: "12rem" }}>
        <Card.Body>
          <Card.Title className={classes.title}>Add Order</Card.Title>
          <Card.Text className={classes.price}>Enter Date Below</Card.Text>
          {message.result != -1 ? (
            <p className={message.result == 1 ? classes.success : classes.fail}>
              {message.message}
            </p>
          ) : (
            <div></div>
          )}

          <input
            value={date}
            type="text"
            placeholder="Date"
            onChange={handleChange}
          ></input>
          <Button
            type="submit"
            className={classes.button}
            variant="primary"
            onClick={AddOrder}
          >
            Add Order
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
export default OrderForm;
