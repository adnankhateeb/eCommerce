import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const ShowInfo = () => {
   const allMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];

   const [months, setMonths] = useState([]);
   console.log("months:", months);

   const getInfo = async () => {
      await axios
         .get("http://localhost:5000/orders/all/stats")
         .then((data) => setMonths(data.data));
   };

   useEffect(() => {
      getInfo();
   }, []);
   return (
      <div style={{ width: "30%", margin: "auto", marginTop: "3%" }}>
         <h2>Stats for the last one year</h2>
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>#</th>
                  <th>Month</th>
                  <th>Total Orders</th>
                  <th>Total Sales</th>
               </tr>
            </thead>
            <tbody>
               {months.map((e, i) => {
                  return (
                     <tr>
                        <td>{i + 1}</td>
                        <td>{allMonths[e._id - 1]}</td>
                        <td>{e.count}</td>
                        <td>₹ {e.total}</td>
                     </tr>
                  );
               })}
            </tbody>
         </Table>
      </div>
   );
};

export default ShowInfo;
