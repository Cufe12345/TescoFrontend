import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import classes from "./BasketItem.module.css";
import { useState, useEffect } from "react";
import { NetworkContext } from "../../../App";
import { useContext } from "react";
import userContext from "../../../contexts/userContext";

/**
 * A component that displays an individual product in the basket
 * @param {*} props the props passed to the component ie the product data
 * @returns 
 */
function BasketItem(props) {
  const ip = useContext(NetworkContext);

  //User data context
  const { userData } = useContext(userContext);
  const { setUserData } = useContext(userContext);

  //Handles the delete button being pressed, naming again is bad
  const handleSubmit2 = (event) => {
    event.preventDefault();
    if (pressed == false) {
      AddItem();
    }
  };
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  //stores the result from the backend 
  const [name, setData] = useState("");

  //stores the text to display on the delete button
  const [buttonText, setText] = useState("Delete");

  //stores if the delete button has been pressed
  const [pressed, setPressed] = useState(false);

  //When the result from the backend is updated it sets the text on the delete button to the result ie if the item was deleted or not
  useEffect(() => {
    console.log(pressed);
    if (pressed == true) {
      console.log(name["result"]);
      if (name["result"] == 0) {
        setText("DELETED!");
        var temp4 = document.getElementById("user");
        temp4.setAttribute("updateBasket", "true");
        setUserData({
          order: userData.order,
          ordertitle: userData.ordertitle,
          query: userData.query,
          updateBasket: "true",
          page: userData.page,
          admin: userData.admin,
        });
      } else {
        setText("Error");
      }
      reset();
      async function reset() {
        await timeout(2000);
        setText("Delete");
        setPressed(false);
      }
    }
    setLoading(false);
  }, [name]);

  /**
   * Gets the value of a cookie
   * @param {*} cookie 
   * @returns 
   */
  function getCookie(cookie) {
    var name = cookie + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  /**
   * Sends a request to the backend to delete an item from the basket, naming is bad
   */
  function AddItem() {
    setPressed(true);
    //var temp = document.getElementById("user").attributes[2];

    var orderId = userData.order;
    var username = getCookie("username");
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        type: "REMOVE",
        value: props.price + "," + props.id + "," + orderId + "," + username,
      }),
    };
    {
    }
    fetch(ip, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }

  //stores if the delete button is loading ie if the request is being sent to the backend
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => setLoading(true);
  return (
    <li className={classes.li}>
      <Card style={{ width: "9rem", height: "15rem" }}>
        <Card.Img
          className={classes.product}
          variant="top"
          src={props.image}
          width="130px"
          height="90px"
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
              {isLoading ? "Deleting…" : buttonText}
            </Button>
          </form>
        </Card.Body>
      </Card>
    </li>
  );
}
export default BasketItem;
