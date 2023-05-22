import classes from "../Products/ProductList.module.css";
import classes2 from "./OrderList.module.css";
import OrderItem from "./Order";
function OrderList(props) {
  return (
    <div>
      {props.past ? (
        <div>
          <div className={classes2.title}>
            <h1>Past Orders</h1>
          </div>
          <ul className={classes.ul}>
            {props.orders.map((item) => {
              //console.log(item.date);
              let extractedDate = item.date.split(" ");
              let date = extractedDate[0];
              let currentDate = new Date();
              let extractedDate2 = item.date.split("/");
              let orderDate = new Date(date.split("/").reverse().join("/"));
              console.log(
                "OD: " + orderDate + " CD: " + currentDate + " OD>CD: "
              );
              if (orderDate > currentDate) {
                return null;
              }
              return (
                <OrderItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title + " : " + item.date}
                  price={item.price}
                />
              );
            })}
          </ul>
        </div>
      ) : (
        <div>
          <div className={classes2.title}>
            <h1>Current Orders</h1>
          </div>
          <ul className={classes.ul}>
            {props.orders.map((item) => {
              let extractedDate = item.date.split(" ");
              let date = extractedDate[0];
              let currentDate = new Date();
              let extractedDate2 = item.date.split("/");
              let orderDate = new Date(date.split("/").reverse().join("/"));
              console.log(
                "OD: " + orderDate + " CD: " + currentDate + " OD<CD: "
              );
              if (orderDate < currentDate) {
                return null;
              }
              return (
                <OrderItem
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  title={item.title + " : " + item.date}
                  price={item.price}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
export default OrderList;
