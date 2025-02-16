import React, { useState } from 'react'
import { removeFromCart, updateQuantity } from '../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const {cartItems, totalQuantity, totalAmount} = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const updateQuantityChange = (id , quantity) => {
       dispatch(updateQuantity({id, quantity}))
  }

  const handleRemove = (id) => {
        dispatch(removeFromCart(id))
  }

  return (
    <>
      <h2>Total Quantity: {totalQuantity}</h2>
      <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
      {
        cartItems.map((product) => (
          <div key={product.id} style={{border:'1px solid grey',padding:"1rem 1rem",marginBottom:"0.6rem"}}>
            <img src={product.image} alt={product.title} style={{width:"15%"}}/>
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Total Price: ${product.totalPrice}</p>
            <input 
            type="number" 
            min="1"
            value={product.quantity}
            onChange={(e) => updateQuantityChange(product.id, parseInt(e.target.value))}
            />'
            <button onClick={() => handleRemove(product.id)}>Remove</button>
          </div>
        ))
      }
      <h3 style={{textAlign:"end", padding:"1rem", fontSize:"2rem"}}>Total: ${totalAmount.toFixed(2)}</h3>
    </>
  )
}

export default Cart