import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListGroup, Badge } from "react-bootstrap";

const Review = () => {
   const [reviews, setReviews] = useState([]);
   console.log(reviews);
   const { productId } = useParams();

   const getReviews = async () => {
      axios
         .get(`https://ecommerce-backend-adnan.herokuapp.com/reviews/${productId}`)
         .then((data) => setReviews(data.data.reviews))
         .catch((err) => console.log(err));
   };

   useEffect(() => {
      getReviews();
   }, []);

   return (
      <div style={{ width: "max-content", margin: "auto", marginTop: "4%" }}>
         {reviews.length ? (
            <ListGroup as="ol" numbered>
               {reviews.map((e) => (
                  <ListGroup.Item
                     as="li"
                     className="d-flex justify-content-between align-items-start"
                  >
                     <div className="ms-2 me-auto">
                        <div className="fw-bol">
                           <span className="fw-bold"> User:</span>{" "}
                           {e.userID.name}
                        </div>
                        <span className="fw-bold"> Review:</span> {e.reviewText}
                     </div>
                  </ListGroup.Item>
               ))}
            </ListGroup>
         ) : (
            <h1>No reviews for this product yet!</h1>
         )}
      </div>
   );
};

export default Review;
