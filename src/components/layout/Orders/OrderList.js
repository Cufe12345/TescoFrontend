import classes from "../Products/ProductList.module.css"
import OrderItem from "./Order";
function OrderList(props){
    
    return <ul className={classes.ul}>
        {props.orders.map((item) => <OrderItem key = {item.id} 
        id = {item.id} 
        image = {item.image} 
        title = {item.title +" : "+ item.date} 
        price = {item.price}
        />)}
    </ul>
}
export default OrderList;