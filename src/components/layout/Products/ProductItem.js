import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import classes from "./ProductItem.module.css";
import { useState, useEffect } from "react";
import { NetworkContext } from "../../../App";
import { useContext } from "react";
import userContext from "../../../contexts/userContext";
function ProductItem(props) {
  //Network context
  const ip = useContext(NetworkContext);

  //Handles the add to order button being pressed
  const handleSubmit2 = (event) => {
    event.preventDefault();
    AddItem();
  };
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  //Stores the result from the backend
  const [name, setData] = useState("");

  //Stores the text to display on the add to order button
  const [buttonText, setText] = useState("Add To Order");

  //Stores if the add to order button has been pressed
  const [pressed, setPressed] = useState(false);

  //User data context
  const { userData } = useContext(userContext);
  const { setUserData } = useContext(userContext);

  //When the result from the backend is updated it sets the text on the add to order button to the result ie if the item was added or not
  useEffect(() => {
    console.log(pressed);
    if (pressed == true) {
      console.log(name["result"]);
      if (name["result"] == 0) {
        setText("Added!");
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
        setText("Add To Order");
        setPressed(false);
      }
    }
    setLoading(false);
  }, [name]);

  /**
   * Gets the value of a cookie
   * @param {string} cookie - the name of the cookie to get the value of
   * @returns the value of the cookie
   * */
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
   * Adds an item to the order
   * */
  function AddItem() {
    setPressed(true);
    //  var temp = document.getElementById("user").attributes[2];
    var orderId = userData.order;
    var username = getCookie("username");
    // var temp3 = document.getElementById("user").attributes[4];
    var query = userData.query;
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
          orderId +
          "," +
          username +
          "," +
          query +
          "," +
          props.title +
          "," +
          props.image,
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

  //Stores if the add to order button is loading
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
