import { useLocation, Link, useNavigate } from "react-router-dom";
import ProductList from "../components/layout/Products/ProductList";
import BasketList from "../components/layout/Products/BasketList";
import { useEffect, useState, useRef } from "react";
import classes from "./SearchResults.module.css";
import logo from "../components/layout/images/Cart2.png";
import SearchBar from "../components/layout/SearchBar";
import SearchIcon from "../components/layout/images/SearchIcon.png";
import Loading from "../components/layout/Loading";
import { motion } from "framer-motion";
import { NetworkContext } from "../App";
import { useContext } from "react";
import userContext from "../contexts/userContext";
function SearchResults() {
  const ip = useContext(NetworkContext);
  const location = useLocation();
  let navigate = useNavigate();

  const inputRef = useRef(null);
  const { state } = useLocation();
  const { data } = state;
  const { userData } = useContext(userContext);
  const { setUserData } = useContext(userContext);
  console.log(data);
  useEffect(() => {
    console.log("useEffect");
    if (document.getElementById("user") != null) {
      if (userData.order != "No order") {
        console.log("user");
        document.getElementById("user").setAttribute("page", location.pathname);
        setUserData({
          order: userData.order,
          ordertitle: userData.ordertitle,
          query: userData.query,
          updateBasket: userData.updateBasket,
          page: location.pathname,
        });
      } else {
        console.log("no user");
        navigate("/login");
      }
    } else {
      console.log("no user");
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    //var temp = document.getElementById("user").attributes[2];
    var orderId = userData.order;
    //console.log(temp["order"]);
    if (orderId != "null") {
      {
        /* document.getElementById("OrderText").textContent = "Modifying "+temp["order"];*/
      }
    }
  });
  const [title, setTitle] = useState();
  useEffect(() => {
    if (title == null) {
      setTitle(userData.ordertitle);
    }
  }, [title]);
  const [price, setPrice] = useState();
  const [basket, setBasket] = useState();
  useEffect(() => {
    if (basket == null) {
      fetchBasket();
      CheckBasket();
      fetchPrice();
    } else {
      console.log(basket);
    }
  }, [basket]);

  const [test, setData] = useState();
  useEffect(() => {
    if (test != null) {
      complete();
    }
  }, [test]);
  function search(e) {
    e.preventDefault();
    //var userData = document.getElementById("user").attributes[2];
    var orderId = userData.order;
    console.log(userData["value"]);
    if (orderId == "No order") {
      FetchOrders();
    } else {
      const requestOptions = {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ type: "SEARCH", value: inputRef.current.value }),
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
  }
  function complete() {
    var user = document.getElementById("user");
    user.setAttribute("query", inputRef.current.value);
    setUserData({
      order: userData.order,
      ordertitle: userData.ordertitle,
      query: inputRef.current.value,
      updateBasket: userData.updateBasket,
      page: userData.page,
    });
    navigate("/Results", { state: { data: test } });
  }
  function fetchBasket() {
    //var orderNum = document.getElementById("user").attributes[2]["value"];
    var orderId = userData.order;
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ type: "BASKET", orderId }),
    };
    {
      /*5.151.184.165
    20.68.14.122*/
    }
    fetch(ip, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        setBasket(json);
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
  const [test2, setData2] = useState();
  useEffect(() => {
    if (test2 != null) {
      Complete();
    }
  }, [test2]);
  function Complete() {
    navigate("/Orders", { state: { data: test2 } });
  }
  async function CheckBasket() {
    //var basketStatus = document.getElementById("user").attributes[5];
    var basketStatus = userData.updateBasket;
    //console.log(basketStatus["value"]);
    if (basketStatus == "true") {
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
    }
    var page = userData.page;
    if (page == "/Results") {
      await timeout(1000);
      CheckBasket();
    }
  }
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  function FetchOrders() {
    document.getElementById("loading").classList.add(classes.loading);
    document.getElementById("loading").classList.remove(classes.initial);
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ type: "FETCH_ORDERS" }),
    };
    {
      /*5.151.184.165
        20.68.14.122*/
    }
    fetch(ip, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        document.getElementById("loading").classList.remove(classes.loading);
        document.getElementById("loading").classList.add(classes.initial);
        setData2(json);
      });
  }
  if (data != "" && data != null && data.Data != "Error") {
    return (
      <div
        className="container text-center  bg-black"
        initial={{
          opacity: 0,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}
        animate={{
          opacity: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}
        exit={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
        transition={{ duration: 0.75 }}
      >
        <div id="Basket" className={classes.sideBar}>
          <div className={classes.sideBarContent}>
            <BasketList items={basket} />
          </div>
          <h3>Total: £{price}</h3>
        </div>
        <div className={classes.orderText}>
          <h1 className={classes.orderText2} id="OrderText">
            {title}
          </h1>
        </div>
        <div className={classes.searchBar}>
          <form onSubmit={search}>
            <input
              className={classes.search}
              type="text"
              ref={inputRef}
            ></input>
            <button
              as={Link}
              to="/Results"
              className={classes.button}
              type="submit"
            >
              <img src={SearchIcon} width="40" height="40"></img>
            </button>
          </form>
        </div>
        <ProductList items={data} />
      </div>
    );
  } else {
    return (
      <div
        className="container text-center  bg-black"
        initial={{
          opacity: 0,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}
        animate={{
          opacity: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        }}
        exit={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
        transition={{ duration: 0.75 }}
      >
        <div className={classes.searchBar}>
          <form onSubmit={search}>
            <input
              className={classes.search}
              type="text"
              ref={inputRef}
            ></input>
            <button
              as={Link}
              to="/Results"
              className={classes.button}
              type="submit"
            >
              <img src={SearchIcon} width="40" height="40"></img>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default SearchResults;
