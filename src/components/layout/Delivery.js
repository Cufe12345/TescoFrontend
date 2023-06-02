import React from "react";
import { Card } from "react-bootstrap";
import { useState, useContext } from "react";
import classes from "./Delivery.module.css";
import Button from "react-bootstrap/Button";
import userContext from "../../contexts/userContext";
import { NetworkContext } from "../../App";
function Delivery(props) {
  const ip = useContext(NetworkContext);
  const { userData } = useContext(userContext);

  const [name, setName] = useState(props.names[0]);
  const [price, setPrice] = useState(0.0);
  const [buttonText, setButtonText] = useState("Add");
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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
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
