import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import Account from "./pages/Account.jsx";
import Checkout from "./pages/Checkout.jsx";
import Cart from "./pages/Cart.jsx";
import Admin from "./pages/Admin.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Blog from "./pages/Blog.jsx";
import Protected from "./routes/Protected.jsx";
import store from "./store";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="account" element={<Account />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="cart" element={<Cart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route
              path="admin/*"
              element={
                <Protected admin>
                  <Admin />
                </Protected>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
