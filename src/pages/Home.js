import ProductList from "../components/layout/Products/ProductList";
import { useEffect } from "react";
import background from "../components/layout/images/Background.png";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Home.module.css";
import { Button } from "react-bootstrap";
import SearchBar from "../components/layout/SearchBar";
import SearchIcon from "../components/layout/images/SearchIcon.png";
import { motion } from "framer-motion";
function HomePage() {
  let navigate = useNavigate();
  function search() {
    var userData = document.getElementById("user").attributes[2];
    console.log(userData["value"]);
    if (userData["value"] == "No order") {
      navigate("/Orders", { state: { data: "" } });
    } else {
      navigate("/Results", { state: { data: "" } });
    }
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
      <div className={classes.pricesContainer}>
        <h1 className={classes.priceText} id="OrderText">
          <div className={classes.theText}>
            Welcome To Tesco App Search For Products Below
          </div>
        </h1>
      </div>
      <div className={classes.searchBar}>
        <SearchBar className={classes.search}></SearchBar>
        <button className={classes.button} onClick={search}>
          <img className={classes.searchIcon} src={SearchIcon}></img>
        </button>
      </div>
    </motion.div>
  );
}
export default HomePage;
