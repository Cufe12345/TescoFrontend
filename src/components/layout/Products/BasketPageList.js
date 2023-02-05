import BasketPageItem from "./BasketPageItem";
import classes from "./BasketPageList.module.css";
function BasketPageList(props) {
  if (typeof props.items === "undefined") {
    return <div></div>;
  } else {
    if (props.items.Data == "Error") {
      return <div></div>;
    }
    console.log(props.items);
    var idN = 0;
    return (
      <ul className={classes.ul}>
        {props.items.map(
          (item) => (
            (idN = idN + 1),
            (
              <BasketPageItem
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
export default BasketPageList;
