import { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const CreateReview = () => {
   const { productID } = useParams();
   console.log("productID:", productID);
   const [formData, setFormData] = useState({
      userID: "",
      reviewText: "",
   });

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post(`http://localhost:5000/reviews/${productID}`, formData);
      alert("Review Created");
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
            <h3>Create Review</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>User ID</Form.Label>
               <Form.Control
                  type="text"
                  placeholder=""
                  name="userID"
                  onChange={handleChange}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Review</Form.Label>
               <Form.Control
                  as="textarea"
                  rows={3}
                  name="reviewText"
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

export default CreateReview;
