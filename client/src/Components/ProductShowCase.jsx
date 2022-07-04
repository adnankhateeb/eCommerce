import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const ProductShowCase = () => {
   const { id } = useParams();
   console.log("id:", id);
   const [product, setProduct] = useState({});
   const getProduct = async () => {
      let data = await fetch(`http://localhost:5000/products/${id}`);
      data = await data.json();
      setProduct(data);
   };

   

   useEffect(() => {
      getProduct();
   }, []);
   return (
      <div
         style={{
            textAlign: "center",
            margin: "auto",
            width: "35%",
            marginTop: "2%",
         }}
      >
         <Card style={{ width: "80%", height: "60%", padding: "5%" }}>
            <Card.Img src={product.productImgLink} />
            <Card.Title>{product.productName}</Card.Title>
            <Card.Subtitle className={"text-muted"}>
               Price: ₹{product.productPrice}
            </Card.Subtitle>
            <Card.Text>Description: {product.description}</Card.Text>
            <Link to={`/products/${product._id}/edit`}>Edit</Link>
            <Link to ={`/reviews/${product._id}`}>Reviews</Link>
            <Link to={`/reviews/${product._id}/create`}>Create Review</Link>
            <Link to={`/order/${product._id}`}><Button>Order Now</Button></Link>
         </Card>
      </div>
   );
};

export default ProductShowCase;
