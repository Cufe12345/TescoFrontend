import BasketPageList from "../components/layout/Products/BasketPageList";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Basket.module.css";
import Loading from "../components/layout/Loading";
import { motion } from "framer-motion";
import { NetworkContext } from "../App";
import { useContext } from "react";
function Basket() {
  let navigate = useNavigate();
  const ip = useContext(NetworkContext);
  const location = useLocation();
  var user = document.getElementById("user");
  if (user != null) {
    user.setAttribute("page", location.pathname);
  }
  const [price, setPrice] = useState("0.00");
  const [userPrice, setUserPrice] = useState("0.00");
  const [basket, setBasket] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (basket == null) {
      if (
        document.getElementById("user").attributes[2]["value"] != "No order"
      ) {
        setLoading(true);
        fetchBasket();
        CheckBasket();
        fetchPrice();
        fetchUserPrice();
      } else {
        navigate("/login");
      }
    } else {
      console.log(basket);
    }
  }, [basket]);
  function fetchBasket() {
    var orderNum = document.getElementById("user").attributes[2]["value"];

    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ type: "BASKET", orderNum }),
    };
    {
      /*5.151.184.165
    20.68.14.122*/
    }
    fetch(ip, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        setBasket(json);
        console.log(json);
      });
  }
  function fetchPrice() {
    var orderNum = document.getElementById("user").attributes[2]["value"];
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ type: "PRICE", orderNum }),
    };
    {
      /*5.151.184.165
    20.68.14.122*/
    }
    fetch(ip, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        setPrice(json["Result"]);
      });
  }
  function fetchUserPrice() {
    var orderNum = document.getElementById("user").attributes[2]["value"];
    var userName = document.getElementById("user").attributes[1]["value"];
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        type: "USER_PRICE",
        value: userName + "," + orderNum,
      }),
    };
    {
      /*5.151.184.165
    20.68.14.122*/
    }
    fetch(ip, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        setUserPrice(json["Result"]);
      });
  }
  async function CheckBasket() {
    var basketStatus = document.getElementById("user").attributes[5];
    console.log(basketStatus["value"]);
    if (basketStatus["value"] == "true") {
      document.getElementById("user").setAttribute("updateBasket", "false");
      fetchBasket();
      fetchPrice();
      fetchUserPrice();
    }
    var page = document.getElementById("user").attributes[6]["value"];
    if (page == "/Basket") {
      await timeout(1000);
      CheckBasket();
    }
  }
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  return (
    <div>
      <Loading></Loading>
      <div className={classes.pricesContainer}>
        <h1 className={classes.priceText} id="OrderText">
          Total: £{price}
        </h1>
        <h1 className={classes.priceText} id="OrderText">
          Your Total: £{userPrice}
        </h1>
      </div>
      <div id="loading" className={loading ? classes.initial : classes.loading}>
        <Loading></Loading>
      </div>
      <BasketPageList items={basket}></BasketPageList>
    </div>
  );
}
export default Basket;
