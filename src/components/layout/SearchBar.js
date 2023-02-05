
import classes from "./SearchBar.module.css";
import search from "./images/SearchIcon.png";
import ref, { useRef } from "react";
function SearchBar(){
    const inputRef = useRef(null);
    function searched(){
        return inputRef.current.value;
    }
    return(
    <div className={classes.div}>
    <input className = {classes.search} type = "text" ref = {inputRef}></input>
    </div>
    );
}
export default SearchBar;