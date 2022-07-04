import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const CreateOrder = () => {
   const [formData, setFormData] = useState({
      userID: "",
   });

   const { productId } = useParams();

   const handleChange = (e) => {
      console.log(e.target.value, e.target.name);
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post(`http://localhost:5000/orders/create`, {
         userID: formData.userID,
         productID: productId,
      });
      alert("Order Placed!")
   };
   return (
      <div>
         <Form
            style={{
               width: "30%",
               margin: "auto",
               marginTop: "5%",
               marginBottom: "2%",
            }}
         >
            <h3>Enter your User ID</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Control
                  type="text"
                  placeholder=""
                  name="userID"
                  onChange={handleChange}
               />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
               Submit
            </Button>
         </Form>
      </div>
   );
};

export default CreateOrder;
