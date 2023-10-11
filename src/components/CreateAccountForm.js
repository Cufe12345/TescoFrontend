import classes2 from "./LoginForm.module.css";
import Button from "react-bootstrap/Button";
import classes from "./CreateAccountForm.module.css";
import Card from "react-bootstrap/Card";
import { useState, useEffect, useRef } from "react";
import Loading from "./layout/Loading";
import { NetworkContext } from "../App";
import { useContext } from "react";

/**
 * A component that displays the Create Account Form
 * @returns
 * */
function CreateAccount() {

  //Stores the inputted password
  const passwordInput = useRef();

  //Stores the inputted confirm password
  const confirmPasswordInput = useRef();

  //Stores the inputted username
  const usernameInput = useRef();

  //Stores the error text to display
  const [errorText, setErrorText] = useState("");

  //Stores whether to display the error text
  const [error, setError] = useState(false);

  //Stores whether to display the success text
  const [success, setSuccess] = useState(false);

  //Stores the success text to display
  const [successText, setSuccessText] = useState("");

  //Network context
  const ip = useContext(NetworkContext);

  //Stores the result from the backend
  const [test, setData] = useState("");
  const [result, setResult] = useState("");

  //When the result from the backend is updated it calls the complete function
  useEffect(() => {
    complete();
  }, [test]);
  const [inputField, setInputField] = useState({
    Username: "",
    Password: "",
    ConfirmPassword: "",
  });
  const inputsHandler = (e) => {
    console.log("RUNNING");
    const { name, value } = e.target;
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /**
   * Sends a request to the backend to create an account
   * */
  async function createAccountRequest() {
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        type: "CREATE",
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

  /**
   * Sets the error and success text and displays it
   */
  async function complete() {
    // document.getElementById("loading").classList.remove(classes.loading);
    //document.getElementById("loading").classList.add(classes.initial);
    if (test.Result == 0) {
      console.log("1");
      setSuccessText("Account Created Successfully");
      setSuccess(true);
    } else if (test.Result == -1) {
      console.log("2");
      setErrorText("Username Taken Try Another");
      setError(true);
    } else if (test.Result == -2) {
      console.log("3");
      setErrorText("Something Went Wrong Try Again");
      setError(true);
    }
    await timeout(5000);
    setResult("");
  }
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  //When the submit button is pressed it checks if the passwords match and password was provided and if so sends a request to the backend
  const submitButton = (e) => {
    e.preventDefault();

    setError(false);
    setSuccess(false);
    if (passwordInput.current.value != confirmPasswordInput.current.value) {
      setErrorText("Password Doesn't Match");
      setError(true);
    } else if (!passwordInput.current.value) {
      setErrorText("No Password Provided");
      setError(true);
    } else {
      // document.getElementById("loading").classList.add(classes.loading);
      // document.getElementById("loading").classList.remove(classes.initial);
      createAccountRequest();
    }
  };
  return (
    <div className={classes.CardOuter}>
      <div className={classes.Title}>
        <b>Register</b>
      </div>
      <div className={classes.Card}>
        <form className={classes.Form} onSubmit={submitButton}>
          <div className={error ? classes.ErrorContainer : classes.HideError}>
            <b>{errorText}</b>
          </div>
          <div
            className={success ? classes.SuccessContainer : classes.HideError}
          >
            <b>{successText}</b>
          </div>
          <div className={classes.usernameText}>
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
          <div className={classes.PasswordTextC}>
            <b>Confirm Password</b>
          </div>
          <div>
            <input
              className={classes.InputField}
              ref={confirmPasswordInput}
              type="password"
            />
          </div>
          <br />
          <div className={classes.RegisterButtonContainer}>
            <button className={classes.RegisterButton} type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateAccount;
