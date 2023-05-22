import BasketPageList from "../components/layout/Products/BasketPageList";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Basket.module.css";
import Loading from "../components/layout/Loading";
import { motion } from "framer-motion";
import { NetworkContext } from "../App";
import { useContext } from "react";
import userContext from "../contexts/userContext";
function Basket() {
  let navigate = useNavigate();
  const ip = useContext(NetworkContext);
  const location = useLocation();
  const { userData } = useContext(userContext);
  const { setUserData } = useContext(userContext);
  var user = document.getElementById("user");
  if (user != null) {
    user.setAttribute("page", location.pathname);
    setUserData({
      order: userData.order,
      ordertitle: userData.ordertitle,
      query: userData.query,
      updateBasket: userData.updateBasket,
      page: location.pathname,
    });
  }
  const [price, setPrice] = useState("0.00");
  const [userPrice, setUserPrice] = useState("0.00");
  const [basket, setBasket] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (basket == null) {
      if (userData.order != "No order") {
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
    //var orderNum = document.getElementById("user").attributes[2]["value"];
    var orderId = userData.order;
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ type: "PRICE", orderId }),
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
  function fetchUserPrice() {
    //var orderNum = document.getElementById("user").attributes[2]["value"];
    var orderId = userData.order;
    var userName = getCookie("username");
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        type: "USER_PRICE",
        value: userName + "," + orderId,
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
    //var basketStatus = document.getElementById("user").attributes[5];
    var basketStatus = userData.updateBasket;
    //console.log(basketStatus["value"]);
    if (basketStatus == true) {
      document.getElementById("user").setAttribute("updateBasket", "false");
      setUserData({
        order: userData.order,
        ordertitle: userData.ordertitle,
        query: userData.query,
        updateBasket: false,
        page: userData.page,
      });
      fetchBasket();
      fetchPrice();
      fetchUserPrice();
    }
    //var page = document.getElementById("user").attributes[6]["value"];
    var page = userData.page;
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
