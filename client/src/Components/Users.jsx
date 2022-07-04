import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Users = () => {
   const [users, setUsers] = useState([]);

   const getUsers = async () => {
      let users = await fetch("http://localhost:5000/users");
      users = await users.json();
      //   console.log("users:", users)
      setUsers(users.users);
   };

   useEffect(() => {
      getUsers();
   }, []);
   return (
      <div className="container">
         {users.map((user) => (
            <Link to={`/users/${user._id}`}>
               <Card style={{ width: "18rem", padding: "5%" }}>
                  <Card.Title>Name: {user.name}</Card.Title>
                  <Card.Text>Email: {user.email}</Card.Text>
                  <span>Addresses :</span>{" "}
                  {user.address.map((elem, i) => (
                     <span>
                        <Card.Text>
                           {i + 1}. {elem}
                        </Card.Text>
                     </span>
                  ))}
               </Card>
            </Link>
         ))}
      </div>
   );
};

export default Users;
