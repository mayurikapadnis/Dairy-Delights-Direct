import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import ProductDetails from "./pages/ProductDetails";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
