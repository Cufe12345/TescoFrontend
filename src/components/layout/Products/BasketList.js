import BasketItem from "./BasketItem";
import classes from "./BasketList.module.css";
function BasketList(props) {
  if (typeof props.items === "undefined") {
    return <div></div>;
  } else {
    if (props.items.Data == "Error") {
      return <div></div>;
    }
    //console.log(props.items);
    var idN = 0;
    return (
      <ul className={classes.ul}>
        {props.items.map(
          (item) => (
            (idN = idN + 1),
            (
              <BasketItem
                key={idN}
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
              />
            )
          )
        )}
      </ul>
    );
  }
}
export default BasketList;
