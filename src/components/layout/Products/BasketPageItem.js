import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import classes from "./BasketPageItem.module.css";
import { useState, useEffect } from "react";
import { NetworkContext } from "../../../App";
import { useContext } from "react";
import userContext from "../../../contexts/userContext";

/**
 * A component that displays an individual product in the basket page
 * @param {*} props the props passed to the component ie the product data 
 * @returns 
 */
function BasketPageItem(props) {
  //Network context
  const ip = useContext(NetworkContext);

  //User data context
  const { userData } = useContext(userContext);
  const { setUserData } = useContext(userContext);

  //Handles the delete button being pressed
  const handleSubmit2 = (event) => {
    event.preventDefault();
    if (pressed == false) {
      console.log("pressed: " + userData.admin);
      if (userData.admin == true) {
        AddItem(true);
        console.log("REACHED");
      } else {
        console.log("REACHED 2");
        AddItem(false);
      }
    }
  };
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  //Stores the result from the backend
  const [name, setData] = useState("");

  //Stores the text to display on the delete button
  const [buttonText, setText] = useState("Delete");

  //Stores if the delete button has been pressed
  const [pressed, setPressed] = useState(false);

  //Stores if the update button has been pressed
  const [updateItem, setUpdateItem] = useState(false);

  //Stores the query to update the product with
  const [query, setQuery] = useState("");

  //Stores the id of the product to update
  const [id, setId] = useState("");

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
   * Removes an item from the basket by sending a request to the backend. Name is bad
   * @param {*} update - if the item is being deleted by an admin or not
   * */
  function AddItem(update) {
    setPressed(true);
    //var temp = document.getElementById("user").attributes[2];
    var orderId = userData.order;
    var username = getCookie("username");

    //If the item is being deleted by an admin then the username is the first word of the title so that it will be deleted by the backend
    if (update) {
      username = extractName(props.title);
    }
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
        if (update) {
          //Triggers refresh
          props.setBasket(null);
        }
        props.setBasket(null);
      });
  }
  const [isLoading, setLoading] = useState(false);

  const handleClick = () => setLoading(true);

  //Handles the update button being pressed
  const updateSubmit = (event) => {
    event.preventDefault();
    updateProduct();
  };

  /**
   * Updates a product by sending a request to the backend
   * */
  async function updateProduct() {
    console.log(extractName(props.title));
    var name = await extractName(props.title);
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        type: "UPDATE_PRODUCT",
        value: query + "," + id + "," + userData.order + "," + name,
      }),
    };
    fetch(ip, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        //If the product was updated then delete the old product as the new one is already added successfully
        if (json.Result == 0) {
          AddItem(true);
        } else {
          alert("Error");
        }
      });
  }

  /**
   * Extracts the name of user from the product title
   * @param {*} title 
   * @returns 
   */
  function extractName(title) {
    var temp = title.split(" ");
    var result = "";
    for (var i = 0; i < temp[0].length; i++) {
      if (temp[0][i] == "'") {
        break;
      }
      result += temp[0][i];
    }
    return result;
  }

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
          <div className={classes.buttonContainer}>
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
            {userData.admin ? (
              <Button
                onClick={() => {
                  setUpdateItem(true);
                }}
                type="submit"
                className={classes.button}
                variant="primary"
              >
                {"Update"}
              </Button>
            ) : (
              <div></div>
            )}
          </div>
          {updateItem ? (
            <div className={classes.updateContainer}>
              <form className={classes.form} onSubmit={updateSubmit}>
                <input
                  type="text"
                  placeholder="query"
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                  value={query}
                />
                <input
                  type="text"
                  placeholder="id"
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  value={id}
                />
                <Button
                  onClick={() => {
                    setUpdateItem(false);
                    updateProduct();
                  }}
                  type="submit"
                  className={classes.button}
                  variant="primary"
                >
                  {"Update"}
                </Button>
              </form>
            </div>
          ) : (
            <div></div>
          )}
        </Card.Body>
      </Card>
    </li>
  );
}
export default BasketPageItem;
