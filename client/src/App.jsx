import { Route, Routes } from "react-router-dom";
import "./App.css";
import Brands from "./Components/Brands";
import CreateOrder from "./Components/CreateOrder";
import CreateProduct from "./Components/CreateProduct";
import CreateReview from "./Components/CreateReview";
import CreateUser from "./Components/CreateUser";
import EditProduct from "./Components/EditProduct";
import EditUser from "./Components/EditUser";
import NavBar from "./Components/Navbar";
import Products from "./Components/Products";
import ProductShowCase from "./Components/ProductShowCase";
import Review from "./Components/Review";
import ShowInfo from './Components/ShowInfo';
import UserDetails from "./Components/UserDetails";
import Users from "./Components/Users";
import ViewOrders from './Components/ViewOrders';

function App() {
   return (
      <div className="App">
         <NavBar />
         <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products/:id" element={<ProductShowCase />} />
            <Route path="/products/create" element={<CreateProduct />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/users/:id/edit" element={<EditUser />} />
            <Route path="/reviews/:productId" element={<Review />} />
            <Route path="/order/:productId" element={<CreateOrder />} />
            <Route
               path="/reviews/:productID/create"
               element={<CreateReview />}
            />
            <Route path="/brands" element={<Brands />} />
            <Route path="/orders/:userID" element={<ViewOrders />} />
            <Route path="/orders/stats" element={<ShowInfo />} />
         </Routes>
      </div>
   );
}

export default App;
