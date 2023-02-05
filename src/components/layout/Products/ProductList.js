import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";
function ProductList(props){
    return <ul className={classes.ul}>
        {props.items.map((item) => <ProductItem key = {item.id} 
        id = {item.id} 
        image = {item.image} 
        title = {item.title} 
        price = {item.price}/>)}
    </ul>
}
export default ProductList;