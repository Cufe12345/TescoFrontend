import { useContext, useEffect, useState } from "react";
import classes from "./Admin.module.css";
import { motion } from "framer-motion";
import { NetworkContext } from "../App";
import userContext from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import OrderForm from "../components/layout/OrderForm";

function AdminPage() {
  //user data context
  const { userData } = useContext(userContext);
  const { setUserData } = useContext(userContext);
  const [authorised, setAuthorised] = useState(false);

  //network context
  const ip = useContext(NetworkContext);
  let navigate = useNavigate();

  //checks if the user is an admin on page load
  useEffect(() => {
    CheckAdmin();
  }, []);

  /**
   * Gets the value of a cookie
   * @param {string} cookie - the name of the cookie to get the value of
   */
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
 * Checks if the user is an admin by checking with the backend and sets the authorised state accordingly
 */
  function CheckAdmin() {
    const requestOptions = {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        type: "CHECK_ADMIN",
        value: getCookie("username"),
      }),
    };
    {
      /*5.151.184.165
  20.68.14.122*/
    }
    fetch(ip, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.Result);
        setAuthorised(json.Result);
        //if the user is an admin then set the user data to reflect this
        if (json.Result == "True") {
          setUserData({
            order: userData.order,
            ordertitle: userData.ordertitle,
            query: userData.query,
            updateBasket: userData.updateBasket,
            page: userData.page,
            admin: true,
          });
        } else {
          setUserData({
            order: userData.order,
            ordertitle: userData.ordertitle,
            query: userData.query,
            updateBasket: userData.updateBasket,
            page: userData.page,
            admin: false,
          });
          //navigate("/login");
        }
      });
  }
  return (
    <motion.div
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
      <div>
        {authorised == "True" ? (
          <div className={classes.mainContainer}>
            <h1>Admin Page</h1>
            <OrderForm></OrderForm>
          </div>
        ) : (
          <h1>Not authorised</h1>
        )}
      </div>
    </motion.div>
  );
}
export default AdminPage;
