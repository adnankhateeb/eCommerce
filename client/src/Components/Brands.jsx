import React, { useEffect, useState } from "react";
import axios from "axios";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Brands = () => {
   const [brands, setBrands] = useState([]);
   console.log("brands:", brands);

   const getBrands = async () => {
      axios
         .get(`http://localhost:5000/brands`)
         .then((data) => setBrands(data.data));
      //  setBrands(data.data)
   };

   useEffect(() => {
      getBrands();
   }, []);
   return (
      <div style={{ width: "25%", margin: "auto", marginTop: "4%" }}>
         <ListGroup as="ol" numbered>
            {brands.map((e) => (
               <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
               >
                  <div className="fw-bol">
                     <span className="fw-bold"> Brand:</span>{" "}
                     <b>{e.brandName}</b>
                  </div>

                  <div>
                     <div className="ms-2 me-auto">
                        <span className="fw-bold"> Products:</span>{" "}
                        <ListGroup as="ol" numbered>
                           {e.products.map((product) => (
                              <Link
                                 to={`/products/${product._id}`}
                                 className="brand"
                              >
                                 <ListGroup.Item>
                                    <i style={{color: "teal"}}> {product.productName}</i>
                                 </ListGroup.Item>
                              </Link>
                           ))}
                        </ListGroup>
                     </div>
                  </div>
               </ListGroup.Item>
            ))}
         </ListGroup>
      </div>
   );
};

export default Brands;
