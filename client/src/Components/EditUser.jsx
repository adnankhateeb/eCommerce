import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
   const { id } = useParams();
   console.log("id:", id);
   const [formData, setFormData] = useState({
      email: "",
      name: "",
      address: "",
   });

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      await axios
         .patch(`https://ecommerce-backend-adnan.herokuapp.com/users/${id}/edit`, formData)
         .then(() => alert("Details Updated!"));
   };
   return (
      <div>
         <Form
            style={{
               width: "20%",
               margin: "auto",
               marginTop: "5%",
               marginBottom: "2%",
               border: "1px solid #bdbdbd",
               padding: "3%",
               borderRadius: "15px",
            }}
         >
            <h3>Edit user</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Enter Name</Form.Label>
               <Form.Control
                  type="text"
                  placeholder=""
                  name="name"
                  onChange={handleChange}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Enter email</Form.Label>
               <Form.Control
                  type="text"
                  placeholder=""
                  name="email"
                  onChange={handleChange}
               />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Enter address</Form.Label>
               <Form.Control
                  type="text"
                  placeholder=""
                  name="address"
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

export default EditUser;
