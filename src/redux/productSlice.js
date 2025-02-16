import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name:"product",
  initialState:{
    cartItems:[],
    totalQuantity:0,
    totalAmount:0
  },
  reducers:{
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if(existingItem){
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price; 
      }else{
         state.cartItems.push({
          ...action.payload,
          quantity : 1,
          totalPrice: action.payload.price
         })
      }
      state.totalQuantity += 1;
      state.totalAmount += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const removeToItem = state.cartItems.find(item => item.id === action.payload);
      if(removeToItem){
        state.totalQuantity -= removeToItem.quantity;
        state.totalAmount -= removeToItem.totalPrice;
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      }
    },
    updateQuantity: (state, action) => {
      const {id, quantity} = action.payload;
      const existingItem = state.cartItems.find(item => item.id === id);
      if(existingItem && quantity > 0){
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalAmount += (quantity - existingItem.quantity) * existingItem.price;
        existingItem.quantity = quantity;
        existingItem.totalPrice = quantity * existingItem.price;
      }
    }
  }
})

export const {addToCart, removeFromCart, updateQuantity} = productSlice.actions;
export default productSlice.reducer;