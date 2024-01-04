import React from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../store/cart-slice";
const Cart = () => {
 const value = useSelector((state)=> state.cart.itemList);
 const dispatch = useDispatch();

 const handleShowcart=()=>{
  dispatch(cartAction.setShowcart())
 }

  const quantity = value.length;
  return (
    <div className="cartIcon">
      <h3 onClick={handleShowcart}>Cart: {quantity} Items</h3>
    </div>
  );
};

export default Cart;
