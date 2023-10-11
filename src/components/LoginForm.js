import { useState, useEffect, useRef } from "react";
import classes from "./LoginForm.module.css";
import Button from "react-bootstrap/Button";
import classes2 from "./CreateAccountForm.module.css";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Loading from "./layout/Loading";
import { NetworkContext } from "../App";
import { UserContext } from "../App";
import { useContext } from "react";
import userContext from "../contexts/userContext";

/**
 * A component that displays the Login Form
 * @returns
 * */
function LoginForm() {
  //Network context
  const ip = useContext(NetworkContext);

  //User data context
  const { userData } = useContext(userContext);
  const { setUserData } = useContext(userContext);
  let navigate = useNavigate();

  //Stores reference to the inputted username
  const usernameInput = useRef();

  //Stores reference to the inputted password
  const passwordInput = useRef();

  //Stores the error text to display
  const [errorText, setErrorText] = useState("Invalid Login Details Provided");

  //Stores whether to display the error text
  const [error, setError] = useState(false);

  //Stores whether to display the success text
  const [success, setSuccess] = useState(false);

  //Stores the success text to display
  const [successText, setSuccessText] = useState("Logged in successfully");

  //Stores the result from the backend
  const [test, setData] = useState("");

  const [fetching, setFetching] = useState(false);

  
  //When the result from the backend is updated it calls the complete function
  useEffect(() => {
    complete();
  }, [test]);
  const [result, setResult] = useState("");

  /**
   * Makes a request to the backend to login
   */
  async function LoginRequest() {
    console.log("Login Request");
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        type: "LOGIN",
        value: usernameInput.current.value + "," + passwordInput.current.value,
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

  //checks if the user is logged in on page load
  useEffect(() => {
    initialCheck();
  });

  //Stores the result from the backend for the orders page
  const [test2, setData2] = useState(null);
  useEffect(() => {
    console.log(test2);
    if (test2 != null) {
      Complete();
    }
  }, [test2]);

  /**
   * Navigates to the orders page
   * */
  function Complete() {
    navigate("/Orders", { state: { data: test2 } });
  }

  /**
   * Fetches the orders data from the backend
   * */
  function FetchOrders() {
    setFetching(true);
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ type: "FETCH_ORDERS" }),
    };
    {
    }
    fetch(ip, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        setData2(json);
        setFetching(false);
      });
  }

  /**
   * Checks if the user is logged in ie if the username cookie is set and navigates to the orders page if they are
   * */
  function initialCheck() {
    var temp = document.getElementById("user");
    var username = getCookie("username");
    if (username != "" && username != null && username != undefined) {
      if (!fetching && test2 == null) {
        FetchOrders();
      } else {
        if (test2 != null) {
          navigate("/Orders", { state: { data: test2 } });
        }
      }
    }
  }

  /**
   * Gets the value of a cookie
   * @param {*} cookie - the name of the cookie to get the value of
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
   * Sets the value of a cookie
   * @param {*} cookie - the name of the cookie to set
   * @param {*} value - the value to set the cookie to
   * @param {*} days - the number of days to set the cookie for
   * */
  function setCookie(cookie, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cookie + "=" + value + ";" + expires + ";path=/";
  }

  /**
   * Sets the errpr and success states to the login button and resets them after 5 seconds
   * */
  async function complete() {
    //document.getElementById("loading").classList.remove(classes.loading);
    // document.getElementById("loading").classList.add(classes.initial);
    if (test != "" && test != null) {
      if (test[0].Result == -1) {
        console.log("2");
        setErrorText("Invalid Details");
        setError(true);
      } else if (test[0].Result == -2) {
        console.log("3");
        setErrorText("Something Went Wrong Try Again");
        setError(true);
      } else {
        console.log(test[0].Result);
        console.log(test[1].Name);
        console.log(test[2].admin);
        var user = document.getElementById("user");
        user.setAttribute("value", test[1].Name);
        setUserData({
          order: userData.order,
          ordertitle: userData.ordertitle,
          query: userData.query,
          updateBasket: userData.updateBasket,
          page: userData.page,
          admin: test[2].admin,
        });
        setCookie("username", test[1].Name, 30);
        setSuccessText("Login Successfully");
        setSuccess(true);
        if (!fetching && test2 == null) {
          FetchOrders();
        } else {
          if (test2 != null) {
            navigate("/Orders", { state: { data: test2 } });
          }
        }
        console.log("4");
      }
      await timeout(5000);
      setResult("");
    }
  }
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const submitButton = (e) => {
    e.preventDefault();

    //document.getElementById("loading").classList.add(classes.loading);
    //document.getElementById("loading").classList.remove(classes.initial);
    setError(false);
    setSuccess(false);
    LoginRequest();
  };
  return (
    <div className={classes.CardOuter}>
      <div className={classes.Title}>
        <b>Login</b>
      </div>
      <div className={classes.Card}>
        <form className={classes.Form} onSubmit={submitButton}>
          <div className={error ? classes.ErrorContainer : classes.HideError}>
            <b>{errorText}</b>
          </div>
          <div
            className={success ? classes.SuccessContainer : classes.HideSuccess}
          >
            <b>{successText}</b>
          </div>
          <div className={classes.EmailText}>
            <b>Username</b>
          </div>
          <div>
            <input
              className={classes.InputField}
              ref={usernameInput}
              type="text"
            />
          </div>
          <div className={classes.PasswordText}>
            <b>Password</b>
          </div>
          <div>
            <input
              className={classes.InputField}
              ref={passwordInput}
              type="password"
            />
          </div>
          <br />
          <div className={classes.LoginButtonContainer}>
            <button className={classes.LoginButton} type="submit">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
