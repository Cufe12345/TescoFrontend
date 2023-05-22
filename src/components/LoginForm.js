import { useState, useEffect, useRef } from "react";
import classes from "./LoginForm.module.css";
import Button from "react-bootstrap/Button";
import classes2 from "./CreateAccountForm.module.css";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Loading from "./layout/Loading";
import { NetworkContext } from "../App";
import { useContext } from "react";
function LoginForm() {
  const ip = useContext(NetworkContext);
  let navigate = useNavigate();
  const usernameInput = useRef();
  const passwordInput = useRef();
  const [errorText, setErrorText] = useState("Invalid Login Details Provided");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successText, setSuccessText] = useState("Logged in successfully");
  const [test, setData] = useState("");
  useEffect(() => {
    complete();
  }, [test]);
  const [result, setResult] = useState("");
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
  useEffect(() => {
    initialCheck();
  });
  const [test2, setData2] = useState(null);
  useEffect(() => {
    console.log(test2);
    if (test2 != null) {
      Complete();
    }
  }, [test2]);
  function Complete() {
    navigate("/Orders", { state: { data: test2 } });
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
  function initialCheck() {
    var temp = document.getElementById("user");
    var username = getCookie("username");
    if (username != "" && username != null && username != undefined) {
      FetchOrders();
    }
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
  function setCookie(cookie, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cookie + "=" + value + ";" + expires + ";path=/";
  }
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
        var user = document.getElementById("user");
        user.setAttribute("value", test[1].Name);
        setCookie("username", test[1].Name, 30);
        setSuccessText("Login Successfully");
        setSuccess(true);
        FetchOrders();
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
