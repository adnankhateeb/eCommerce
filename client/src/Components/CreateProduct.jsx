import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const CreateProduct = () => {
   const [formData, setFormData] = useState({
      productName: "",
      categories: "",
      productImgLink: "",
      productPrice: 0,
      description: "",
   });

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.post(`http://localhost:5000/products/create`, formData);
      alert("Product Created!");
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
            <h3>Create Product</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Product Name</Form.Label>
               <Form.Control
                  type="text"
                  placeholder=""
                  name="productName"
                  onChange={handleChange}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Image Link</Form.Label>
               <Form.Control
                  type="text"
                  placeholder=""
                  name="productImgLink"
                  onChange={handleChange}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Category</Form.Label>
               <Form.Control
                  type="text"
                  placeholder=""
                  name="categories"
                  onChange={handleChange}
               />
               <Form.Text className="text-muted">
                  You can add categories to the product
               </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Price</Form.Label>
               <Form.Control
                  type="text"
                  placeholder=""
                  name="productPrice"
                  onChange={handleChange}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Description</Form.Label>
               <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
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

export default CreateProduct;
