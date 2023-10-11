import classes from "../Products/ProductItem.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import userContext from "../../../contexts/userContext";
import { useContext } from "react";

/**
 * A component that displays an order
 * @param {*} props the props passed to the component ie the order data
 * @returns
 * */
function Order(props) {
  let navigate = useNavigate();

  //User data context
  const { userData } = useContext(userContext);
  const { setUserData } = useContext(userContext);

  //Handles the modify order button being pressed
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("CALLED");
    var user = document.getElementById("user");
    setUserData({
      order: props.id,
      ordertitle: props.title,
      query: userData.query,
      updateBasket: userData.updateBasket,
      page: userData.page,
      admin: userData.admin,
    });
    user.setAttribute("order", props.id);
    user.setAttribute("ordertitle", props.title);
    navigate("/Results", { state: { data: "" } });
  };
  return (
    <li className={classes.li}>
      <Card style={{ width: "18rem", height: "20rem" }}>
        <Card.Img
          variant="top"
          src={props.image}
          width="260px"
          height="180px"
        />
        <Card.Body>
          <Card.Title className={classes.title}>{props.title}</Card.Title>
          <Card.Text className={classes.price}>£{props.price}</Card.Text>
          <form onSubmit={handleSubmit}>
            <Button type="submit" className={classes.button} variant="primary">
              Modify Order
            </Button>
          </form>
        </Card.Body>
      </Card>
    </li>
  );
}
export default Order;
