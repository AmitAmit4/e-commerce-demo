import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(data);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div style={{width:"80%", margin:"2rem auto",textAlign:"center"}}>
      <img src={product.image} alt={product.title} style={{textAlign:"end",width:"50%",}} />
      <h2 style={{fontSize:"1.8rem"}}>{product.title}</h2>
      <p style={{textAlign:"justify",fontSize:"1.3rem"}}>{product.description}</p>
      <p style={{fontSize:"2rem", fontFamily:"sans-serif"}}>Price: ${product.price}</p>
    </div>
  )
}

export default ProductDetails