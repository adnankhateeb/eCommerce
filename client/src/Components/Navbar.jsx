import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
   return (
      <div>
         <Navbar bg="dark" variant="dark" className="navbarBS">
            <Container>
               <Navbar.Brand to="/" style={{ color: "white" }}>
                  e-Commerce
               </Navbar.Brand>
               <Nav className="rightSide">
                  <Link to="/" style={{ color: "white", marginRight: "5%" }}>
                     View Products
                  </Link>
                  <Link
                     to="/users"
                     style={{ color: "white", marginRight: "5%" }}
                  >
                     View Users
                  </Link>
                  <Link
                     to="/users/create"
                     style={{ color: "white", marginRight: "5%" }}
                  >
                     Create User
                  </Link>
                  <Link
                     to="/products/create"
                     style={{ color: "white", marginRight: "5%" }}
                  >
                     Create Product
                  </Link>
                  <Link
                     to="/brands"
                     style={{ color: "white", marginRight: "5%" }}
                  >
                     View Brands
                  </Link>
                  <Link
                     to="/orders/stats"
                     style={{ color: "white", marginRight: "5%" }}
                  >
                     View Stats
                  </Link>
               </Nav>
            </Container>
         </Navbar>
      </div>
   );
};

export default NavBar;
