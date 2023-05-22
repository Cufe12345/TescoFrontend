import OrderList from "../components/layout/Orders/OrderList";
import classes2 from "../components/CreateAccountForm.module.css";
import classes from "./OrdersPage.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
const testData = [
  {
    id: "1",
    title: "Order",
    date: "04/12/2022",
    price: "£120.00",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
  },
  {
    id: "2",
    title: "Order",
    date: "10/12/2022",
    price: "£125.00",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg",
  },
];
function OnModify(title, id) {
  alert(title);
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
function Orders() {
  const { state } = useLocation();
  const { data } = state;
  let navigate = useNavigate();
  const [nameRefresh, setRefresh] = useState("");
  const [name, setResult] = useState("");
  var redirect = false;
  useEffect(() => {
    var username = getCookie("username");
    if (username != undefined && username != null && username != "") {
      document.getElementById("NameText").innerHTML = "Welcome " + username;
    } else {
      redirect = true;
      navigate("/Login");
    }
    if (redirect == true) {
      navigate("/Login");
    }
  }, [name]);

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
        <div className={classes2.Container}>
          <h1 className={classes2.h1} id="NameText">
            {name}
          </h1>
        </div>
        <div className={classes.orders}>
          <OrderList orders={data} past={false} />
          <OrderList orders={data} past={true} />
        </div>
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
        <h1 className={classes2.h1} id="NameText">
          {name}
        </h1>
        <h1 className={classes2.h1}>Failed to Fetch Orders</h1>
      </div>
    );
  }
}

export default Orders;
