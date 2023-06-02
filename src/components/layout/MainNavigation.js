import { Link, redirect, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import logo from "./images/Cart2.png";
import logo2 from "./images/Tesco-Logo.png";
import SearchBar from "./SearchBar";
import SearchIcon from "./images/SearchIcon.png";
import ref, { useRef } from "react";
import { useState, useEffect } from "react";
import { ReactDOM } from "react";
import { NetworkContext } from "../../App";
import { useContext } from "react";
import userContext from "../../contexts/userContext";
function MainNavigation() {
  const ip = useContext(NetworkContext);
  const { userData } = useContext(userContext);
  const { setUserData } = useContext(userContext);
  const inputRef = useRef(null);
  let navigate = useNavigate();
  const [test, setData] = useState();
  useEffect(() => {
    if (test != null) {
      complete();
    }
  }, [test]);
  function print() {}
  function searched() {
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
  async function search() {
    searched();
    const val = inputRef.current.value;
    console.log(val);
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
      admin: userData.admin,
    });
    navigate("/Results", { state: { data: test } });
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
  function toBasket() {
    navigate("/Basket");
  }
  function FetchOrders() {
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
        setData2(json);
      });
  }
  function toOrders() {
    FetchOrders();
  }
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img
          className={classes.logo2}
          src={logo2}
          width="150"
          height="100"
        ></img>
      </div>
      <nav>
        <ul className={classes.menu1}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/CreateAccount">CreateAccount</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        </ul>
        <ul className={classes.menu1}>
          <li>
            <button className={classes.b} onClick={toOrders}>
              Orders
            </button>
          </li>
          {/*<li><input className = {classes.search} type = "text" onSubmit = {search} ref = {inputRef}></input></li>
                <li><button as ={Link} to = "/Results" className = {classes.button} onClick = {search} ><img src={SearchIcon} width ="20" height = "20"></img></button></li>*/}
          <button className={classes.menuButton} onClick={toBasket}>
            <img className={classes.img} src={logo} width="50" height="50" />
          </button>
        </ul>
      </nav>
      <div
        id="user"
        value="null"
        order="No order"
        ordertitle="N/A"
        query="N/A"
        updateBasket="false"
        page=""
      ></div>
    </header>
  );
}
export default MainNavigation;
