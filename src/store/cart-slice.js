import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
 name: "cart",
 initialState: {
  itemList: [],
  totalQuantity: 0,
  showCart: false  
 },
reducers: {
    addTocart(state, action){
    const newItem = action.payload;
    const existingItem = state.itemList.find((item)=> item.id === newItem.id);
    if(existingItem){
       existingItem.totalPrice += newItem.price;
       existingItem.quantity++;
    } else{
        state.itemList.push({
           id: newItem.id,
           price: newItem.price,
           quantity: 1,
           totalPrice: newItem.price,
           name: newItem.name
        })
        state.totalQuantity++;
    }
    },
    removeFromcart(state, action){
   const id = action.payload;

   const existingItem = state.itemList.find((item)=> item.id === id);
   if(existingItem.quantity === 1){
    state.itemList = state.itemList.filter((item)=> item.id !== id);
    state.totalQuantity--;
   } else {
    existingItem.quantity--;
    existingItem.totalPrice -= existingItem.price;
   }
    },
    setShowcart(state){
     state.showCart = !state.showCart;
    }
}
})


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
}



export const cartAction = cartSlice.actions;

export default cartSlice;