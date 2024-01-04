import { createSlice } from "@reduxjs/toolkit";

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

export const cartAction = cartSlice.actions;

export default cartSlice;