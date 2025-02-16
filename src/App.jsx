import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import { useSelector } from "react-redux";

const App = () => {
  const totalQuantity = useSelector((state) => state.product.totalQuantity);
  return (
    <div>
      <Router>
        <nav style={{display:'flex', gap:"1.4rem", color: "black", fontSize:"1.4rem", padding:"1rem"}}>
          <Link to="/">Product</Link>
          <Link to="/cart">Cart{totalQuantity > 0 && `(${totalQuantity})`}</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/product/:id" element={<ProductDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
