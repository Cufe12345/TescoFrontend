import React from "react";
import { Card } from "react-bootstrap";
import { useState, useContext } from "react";
import classes from "./Delivery.module.css";
import Button from "react-bootstrap/Button";
import userContext from "../../contexts/userContext";
import { NetworkContext } from "../../App";

/**
 * A component that displays the delivery and discount options card
 * @param {*} props the props passed to the component ie the names of the people in the order
 * */
function Delivery(props) {
  //Network context
  const ip = useContext(NetworkContext);

  //User data context
  const { userData } = useContext(userContext);

  //Stores the name of who to apply the delivery or discount to
  const [name, setName] = useState(props.names[0]);

  //Stores the price of the delivery or discount
  const [price, setPrice] = useState(0.0);

  //Stores the text to display on the add button
  const [buttonText, setButtonText] = useState("Add");


  /**
   * Adds the delivery or discount to the order for the user by sending a request to the backend
   * */
  function addDelivery() {
    setButtonText("Adding");
    console.log("Pressed");
    const orderId = userData.order;
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        type: "ADD_DELIVERY",
        value: orderId + "," + name + "," + price,
      }),
    };
    fetch(ip, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.Result == 0) {
          setButtonText("Success");
          props.setBasket(null);
        } else {
          setButtonText("Error");
        }
      });
  }

  //Handles the name being changed
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  //Handles the price being changed
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  return (
    <div>
      <Card style={{ width: "18rem", height: "10rem" }}>
        <Card.Body>
          <Card.Title className={classes.title}>
            {"Add Delivery or Discount"}
          </Card.Title>
          <Card.Text className={classes.price}>
            {"Select Name and Enter Price Below"}
          </Card.Text>
          <select value={name} onChange={handleNameChange}>
            {props.names.map((name) => (
              <option value={name}>{name}</option>
            ))}
          </select>
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            placeholder="price"
            style={{ marginLeft: 5 }}
          ></input>
          <div className={classes.buttonContainer}>
            <Button
              onClick={() => {
                addDelivery();
              }}
              variant="primary"
              type="submit"
              className={classes.button}
            >
              {buttonText}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
export default Delivery;
