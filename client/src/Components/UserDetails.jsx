import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDetails = () => {
   const [user, setUser] = useState({});
   console.log("user:", user);
   const { id } = useParams();
   console.log("id:", id);

   const getOneUser = async () => {
      let user = axios
         .get(`https://ecommerce-backend-adnan.herokuapp.com/users/${id}`)
         .then((data) => setUser(data.data));
      setUser(user);
   };

   useEffect(() => {
      getOneUser();
   }, []);
   return (
      <div>
         <Card
            style={{
               width: "20%",
               padding: "3%",
               margin: "auto",
               marginTop: "3%",
            }}
         >
            <Card.Title>Name: {user.name}</Card.Title>
            <Card.Text>Email: {user.email}</Card.Text>
            <span>Addresses :</span>{" "}
            {user.address
               ? user.address.map((elem, i) => (
                    <span>
                       <Card.Text>
                          {i + 1}. {elem}
                       </Card.Text>
                    </span>
                 ))
               : null}
            <Link to={`/users/${user._id}/edit`}>
               <Button variant="secondary" style={{ margin: "5px" }}>
                  Edit
               </Button>
            </Link>
            <Link to={`/orders/${user._id}`}>
               <Button>View Orders</Button>
            </Link>
         </Card>
      </div>
   );
};

export default UserDetails;
