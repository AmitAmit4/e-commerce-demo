import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/productSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMount = true;
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("products data", data);
        setProducts(data);
        if(isMount){
        setProducts(data);
        }
        return () => {
          isMount = false;
        }
      });
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <h1 style={{ textAlign: "center", textDecoration: "underline" }}>
        Product List
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          width: "90%",
          margin: "3rem auto",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              boxShadow: "0 0 10px grey",
              padding: "0.8rem",
              width: "23%",
              textAlign: "center",
              lineHeight: "2rem",
            }}
            className="product-box"
          >
            <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", height: "17rem" }}
            />
            <div className="tooltip">
              <h2>
                {product.title.length > 20
                  ? product.title.slice(0, 17) + "..."
                  : product.title}
              </h2>
              <span className="tooltip-text">{product.title}</span>
            </div>
            <p style={{ fontSize: "1.7rem", margin: "0.5rem 0" }}>
              ${product.price}
            </p>
            </Link>
            <button
              onClick={() => handleAddToCart(product)}
              style={{ fontSize: "1.3rem", padding: "0.2rem 0.9rem" }}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
