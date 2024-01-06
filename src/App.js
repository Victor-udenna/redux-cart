import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./components/Notification";
import { fetchdata, sendCartdata } from "./store/cart-actions";
let isFirstRender = true;

function App() {
const isLoggedIn = useSelector((state)=>  state.auth.isLoggedIn);
const cart = useSelector((state)=> state.cart);
const dispatch = useDispatch()
const notification = useSelector((state)=> state.ui.notification);

useEffect(()=>{
 dispatch(fetchdata()) 
},[dispatch])

useEffect(()=>{
  if(isFirstRender){
    isFirstRender = false;
    return;
  }

if(cart.changed){
dispatch(sendCartdata(cart));
}
}, [cart])

console.log(cart, "tt")
  return (
    <div className="App">
{notification &&       <Notification type={notification.type} message={notification.message}/>}
     {!isLoggedIn && <Auth />}
     { isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
