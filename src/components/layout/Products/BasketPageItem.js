import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import classes from "./BasketPageItem.module.css";
import { useState, useEffect } from "react";
import { NetworkContext } from "../../../App";
import { useContext } from "react";
import userContext from "../../../contexts/userContext";
function BasketPageItem(props) {
  const ip = useContext(NetworkContext);
  const { userData } = useContext(userContext);
  const { setUserData } = useContext(userContext);
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
  const [name, setData] = useState("");
  const [buttonText, setText] = useState("Delete");
  const [pressed, setPressed] = useState(false);
  const [updateItem, setUpdateItem] = useState(false);
  const [query, setQuery] = useState("");
  const [id, setId] = useState("");
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
  function AddItem(update) {
    setPressed(true);
    //var temp = document.getElementById("user").attributes[2];
    var orderId = userData.order;
    var username = getCookie("username");
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
      /*5.151.184.165
20.68.14.122*/
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
  const updateSubmit = (event) => {
    event.preventDefault();
    updateProduct();
  };

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
        if (json.Result == 0) {
          AddItem(true);
        } else {
          alert("Error");
        }
      });
  }
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
