import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";

const ViewOrders = () => {
   const [orders, setOrders] = useState([]);
   console.log("orders:", orders);
   const [total, setTotal] = useState(0);
   console.log("total:", total);

   const { userID } = useParams();
   console.log("userID:", userID);

   const getOrders = async () => {
      await axios
         .get(`http://localhost:5000/orders/${userID}`)
         .then((data) => {
            console.log(data.data);
            setOrders(data.data.orders.productID);
            setTotal(data.data.sum);
         });
   };

   useEffect(() => {
      getOrders();
   }, []);

   return (
      <div style={{ marginTop: "5%" }}>
         <h1> Your Order History: </h1>
         <div
            style={{
               width: "40%",
               margin: "auto",
               marginTop: "3%",
               marginBottom: "3%",
            }}
         >
            {orders.length ? (
               <Table striped bordered hover>
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                     </tr>
                  </thead>
                  <tbody>
                     {orders.map((e, i) => {
                        return (
                           <tr>
                              <td>{i + 1}</td>
                              <td>{e.productName}</td>
                              <td>₹ {e.productPrice}</td>
                           </tr>
                        );
                     })}
                  </tbody>
               </Table>
            ) : (
               <h1>No Order History Found!</h1>
            )}
         </div>
         {orders.length ? (
            <div>
               <h1>Total Spent: ₹ {total}</h1>
            </div>
         ) : null}
      </div>
   );
};

export default ViewOrders;
