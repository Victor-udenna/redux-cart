import { cartAction } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchdata =()=>{
    return async (dispatch)=>{
       const  fetchHandler = async ()=>{
  const res = await fetch("https://wallet-test-76537-default-rtdb.firebaseio.com/cartitems.json");
  const data = await res.json();
  console.log(data, "na the request oo")
  return data
}
try{
    const cartData = await fetchHandler();
    dispatch(cartAction.replaceData(cartData))
}catch(err){
    dispatch(uiActions.showNotification({
        message: "Request failed",
        type: 'error',
        open: true
      }))
}
    }
}

export const sendCartdata =(cart)=>{
    return async (dispatch)=>{
        dispatch(uiActions.showNotification({
            message: "Sending requst",
            type: 'warning',
            open: true
          })) 
          
          const sendRequest  = async ()=>{
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
            try{
          await sendRequest();
           } catch(err){
            dispatch(uiActions.showNotification({
                message: "Request failed",
                type: 'error',
                open: true
              }))
           }
    }
};