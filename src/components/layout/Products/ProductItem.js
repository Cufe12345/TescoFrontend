import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import classes from "./ProductItem.module.css";
import { useState, useEffect } from "react";
import { NetworkContext } from "../../../App";
import { useContext } from "react";
function ProductItem(props) {
  const ip = useContext(NetworkContext);
  const handleSubmit2 = (event) => {
    event.preventDefault();
    AddItem();
  };
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  const [name, setData] = useState("");
  const [buttonText, setText] = useState("Add To Order");
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    console.log(pressed);
    if (pressed == true) {
      console.log(name["result"]);
      if (name["result"] == 0) {
        setText("Added!");
        var temp4 = document.getElementById("user");
        temp4.setAttribute("updateBasket", "true");
      } else {
        setText("Error");
      }
      reset();
      async function reset() {
        await timeout(2000);
        setText("Add To Order");
        setPressed(false);
      }
    }
    setLoading(false);
  }, [name]);
  function AddItem() {
    setPressed(true);
    var temp = document.getElementById("user").attributes[2];
    var temp2 = document.getElementById("user").attributes[1];
    var temp3 = document.getElementById("user").attributes[4];
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        type: "ADD",
        value:
          props.id +
          "," +
          props.price +
          "," +
          temp["value"] +
          "," +
          temp2["value"] +
          "," +
          temp3["value"],
      }),
    };
    {
      /*5.151.184.165
20.68.14.122*/
    }
    fetch(ip, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => setLoading(true);
  return (
    <li className={classes.li}>
      <Card style={{ width: "18rem", height: "23rem" }}>
        <Card.Img
          className={classes.product}
          variant="top"
          src={props.image}
          width="260px"
          height="180px"
        />
        <Card.Body>
          <Card.Title className={classes.title}>{props.title}</Card.Title>
          <Card.Text className={classes.price}>£{props.price}</Card.Text>

          <form onSubmit={handleSubmit2}>
            <Button
              onClick={!isLoading ? handleClick : null}
              type="submit"
              className={classes.button}
              variant="primary"
            >
              {" "}
              {isLoading ? "Adding…" : buttonText}
            </Button>
          </form>
        </Card.Body>
      </Card>
    </li>
  );
}
export default ProductItem;
