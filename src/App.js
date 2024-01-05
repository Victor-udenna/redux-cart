import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
let isFirstRender = true;

function App() {
const isLoggedIn = useSelector((state)=>  state.auth.isLoggedIn);
const cart = useSelector((state)=> state.cart);
const dispatch = useDispatch()
const notification = useSelector((state)=> state.ui.notification);

useEffect(()=>{
  if(isFirstRender){
    isFirstRender = false;
    return;
  }
const sendRequest  = async()=>{
  dispatch(uiActions.showNotification({
    message: "Sending requst",
    type: 'warning',
    open: true
  }))
 const res = await fetch("https://wallet-test-76537-default-rtdb.firebaseio.com/cartitems.json", {
  method: "Put",
  body: JSON.stringify(cart)
})
 const data = await res.json();
 dispatch(uiActions.showNotification({
  message: "Request sent",
  type: 'success',
  open: true
}))
}
sendRequest().catch((err)=>{
  dispatch(uiActions.showNotification({
    message: "Request failed",
    type: 'error',
    open: true
  }))
console.log(err)  
})
}, [cart])
console.log(cart)

  return (
    <div className="App">
{notification &&       <Notification type={notification.type} message={notification.message}/>}
     {!isLoggedIn && <Auth />}
     { isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
