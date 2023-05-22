import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import classes from "./BasketPageItem.module.css";
import { useState, useEffect } from "react";
import { NetworkContext } from "../../../App";
import { useContext } from "react";
function BasketPageItem(props) {
  const ip = useContext(NetworkContext);
  const handleSubmit2 = (event) => {
    event.preventDefault();
    if (pressed == false) {
      AddItem();
    }
  };
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  const [name, setData] = useState("");
  const [buttonText, setText] = useState("Delete");
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    console.log(pressed);
    if (pressed == true) {
      console.log(name["result"]);
      if (name["result"] == 0) {
        setText("DELETED!");
        var temp4 = document.getElementById("user");
        temp4.setAttribute("updateBasket", "true");
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
  function AddItem() {
    setPressed(true);
    var temp = document.getElementById("user").attributes[2];

    var username = getCookie("username");
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        type: "REMOVE",
        value:
          props.price + "," + props.id + "," + temp["value"] + "," + username,
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
          height="130px"
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
export default BasketPageItem;
