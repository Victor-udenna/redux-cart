import React from "react";
import { useDispatch } from "react-redux";
import { cartAction } from "../store/cart-slice";

import "./Product.css";
const Product = ({ name, id, imgURL, price }) => {
 const dispatch = useDispatch();

 const addTocart =()=>{
 dispatch(cartAction.addTocart(
  {
    name,
    id,
    price
   }
 )) 
 }

  return (
    <div className="card">
      <img src={imgURL} alt={name} />
      <h2>{name}</h2>
      <p>$ {price}</p>
      <button onClick={addTocart}>Add to cart</button>
    </div>
  );
};

export default Product;
